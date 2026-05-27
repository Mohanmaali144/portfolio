/* global process */
// Fetches recent commits from Mohan's public GitHub activity and uses Groq
// to rewrite each commit message into a clean one-line summary. Cached
// in-memory for 30 minutes so we don't hammer either API.

const GITHUB_USER = 'Mohanmaali144';
const MAX_COMMITS = 12;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

let cache = { ts: 0, data: null };

const json = (res, status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.end(JSON.stringify(body));
};

const ghHeaders = () => {
    const h = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'mohan-portfolio',
    };
    if (process.env.GITHUB_TOKEN) {
        h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return h;
};

const fetchEvents = async () => {
    const r = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`,
        { headers: ghHeaders() }
    );
    if (!r.ok) throw new Error(`GitHub events ${r.status}`);
    return r.json();
};

const fetchRepoMeta = async (fullName) => {
    try {
        const r = await fetch(`https://api.github.com/repos/${fullName}`, {
            headers: ghHeaders(),
        });
        if (!r.ok) return null;
        const data = await r.json();
        return {
            description: data.description || '',
            language: data.language || '',
            url: data.html_url,
        };
    } catch {
        return null;
    }
};

const fetchCommitDetail = async (repoFullName, sha) => {
    try {
        const r = await fetch(
            `https://api.github.com/repos/${repoFullName}/commits/${sha}`,
            { headers: ghHeaders() }
        );
        if (!r.ok) return null;
        return await r.json();
    } catch {
        return null;
    }
};

// GitHub's events endpoint returns PushEvent payloads WITHOUT the commits[]
// array — only `head` (latest SHA) and `before`. So we collect candidate SHAs
// from the events feed and fetch each commit's detail in parallel.
const extractCommits = async (events) => {
    const targets = [];
    const seen = new Set();
    for (const ev of events) {
        if (ev.type !== 'PushEvent') continue;
        const sha = ev.payload?.head;
        if (!sha || seen.has(sha)) continue;
        seen.add(sha);
        targets.push({
            sha,
            repo: ev.repo.name,
            eventDate: ev.created_at,
        });
        if (targets.length >= MAX_COMMITS) break;
    }

    const detailed = await Promise.all(
        targets.map(async (t) => {
            const data = await fetchCommitDetail(t.repo, t.sha);
            if (!data) return null;
            const firstLine = String(data.commit?.message || '')
                .split('\n')[0]
                .trim();
            if (!firstLine) return null;
            if (/^Merge (pull request|branch|remote)/i.test(firstLine)) return null;
            return {
                sha: t.sha,
                shortSha: t.sha.slice(0, 7),
                message: firstLine,
                repo: t.repo,
                date: data.commit?.author?.date || t.eventDate,
                url:
                    data.html_url ||
                    `https://github.com/${t.repo}/commit/${t.sha}`,
            };
        })
    );

    return detailed.filter(Boolean);
};

const polishWithGroq = async (commits, repoMeta) => {
    if (!process.env.GROQ_API_KEY || commits.length === 0) return null;

    const numbered = commits
        .map((c, i) => {
            const meta = repoMeta[c.repo] || {};
            const repoShort = c.repo.split('/')[1] || c.repo;
            return `${i + 1}. Repo "${repoShort}"${meta.description ? ` — ${meta.description}` : ''}
   Raw commit: ${c.message}`;
        })
        .join('\n\n');

    const prompt = `You are rewriting raw git commit messages into clean, recruiter-friendly one-line summaries for a developer's portfolio page.

For each numbered commit below, write a SINGLE sentence (max 18 words) that:
- Describes what was done in plain language (active voice, past tense)
- Avoids dev slang like "wip", "minor fix", "stuff", "things"
- Avoids meta phrases ("this commit", "the developer", "the user")
- Stays factual — never invent features the commit doesn't mention
- Uses the repo description as context if the raw message is vague
- If the raw message is already clear and human-readable, lightly polish it instead of rewriting

Return STRICT JSON in this exact shape: {"summaries": ["sentence 1", "sentence 2", ...]}
The summaries array must have exactly ${commits.length} items in the same order as the input.

Commits:
${numbered}`;

    try {
        const r = await fetch(GROQ_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.2,
                max_tokens: 800,
                response_format: { type: 'json_object' },
            }),
        });
        if (!r.ok) return null;
        const data = await r.json();
        const raw = data?.choices?.[0]?.message?.content?.trim();
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const arr = Array.isArray(parsed?.summaries) ? parsed.summaries : null;
        if (!arr || arr.length !== commits.length) return null;
        return arr.map((s) => String(s).trim());
    } catch {
        return null;
    }
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return json(res, 405, { error: 'Method not allowed' });
    }

    if (cache.data && Date.now() - cache.ts < CACHE_TTL_MS) {
        return json(res, 200, cache.data);
    }

    try {
        const events = await fetchEvents();
        const commits = await extractCommits(events);

        if (commits.length === 0) {
            const payload = {
                user: GITHUB_USER,
                profileUrl: `https://github.com/${GITHUB_USER}`,
                commits: [],
                fetchedAt: new Date().toISOString(),
                aiPolished: false,
            };
            cache = { ts: Date.now(), data: payload };
            return json(res, 200, payload);
        }

        const repoNames = [...new Set(commits.map((c) => c.repo))];
        const repoMetaEntries = await Promise.all(
            repoNames.map(async (name) => [name, await fetchRepoMeta(name)])
        );
        const repoMeta = Object.fromEntries(repoMetaEntries);

        const summaries = await polishWithGroq(commits, repoMeta);

        const enriched = commits.map((c, i) => {
            const meta = repoMeta[c.repo] || {};
            const repoShort = c.repo.split('/')[1] || c.repo;
            return {
                sha: c.shortSha,
                message: c.message,
                polished: summaries?.[i] || c.message,
                repo: repoShort,
                repoFull: c.repo,
                repoUrl: meta.url || `https://github.com/${c.repo}`,
                repoDescription: meta.description || '',
                repoLanguage: meta.language || '',
                date: c.date,
                url: c.url,
            };
        });

        const payload = {
            user: GITHUB_USER,
            profileUrl: `https://github.com/${GITHUB_USER}`,
            commits: enriched,
            fetchedAt: new Date().toISOString(),
            aiPolished: !!summaries,
        };

        cache = { ts: Date.now(), data: payload };
        return json(res, 200, payload);
    } catch (err) {
        // If GitHub is down/rate-limited but we have an older cached payload, serve it.
        if (cache.data) {
            return json(res, 200, { ...cache.data, stale: true });
        }
        return json(res, 502, {
            error: err?.message || 'Failed to fetch GitHub activity',
        });
    }
}
