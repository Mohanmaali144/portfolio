/* global process */
// Vercel serverless function — keeps GROQ_API_KEY off the client.
// Local dev: wired through a Vite middleware in vite.config.js so /api/chat
// works with `npm run dev` too.

import {
    profileData,
    heroRoles,
    servicesData,
    techGroupsData,
    projectsData,
    resumeExperiencesData,
    resumeEducationData,
    faqData,
} from '../src/constants/portfolioData.js';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 2000;

const MONTH_INDEX = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

const parseMonthYear = (str) => {
    const trimmed = String(str).trim();
    if (/^present$/i.test(trimmed) || /^now$/i.test(trimmed)) return new Date();
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) return null;
    const m = MONTH_INDEX[parts[0].toLowerCase()];
    const y = Number(parts[1]);
    if (m === undefined || !y) return null;
    return new Date(y, m, 1);
};

const computeExperience = () => {
    let totalMonths = 0;
    for (const exp of resumeExperiencesData) {
        const [startStr, endStr] = exp.period.split(/[–—-]/).map((s) => s.trim());
        const start = parseMonthYear(startStr);
        const end = parseMonthYear(endStr) || new Date();
        if (!start) continue;
        const months =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months);
    }
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`);
    if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`);
    const label = parts.join(' ') || '0 months';
    return { totalMonths, years, months, label, roleCount: resumeExperiencesData.length };
};

const exp = computeExperience();
const currentExp = resumeExperiencesData[0] || null;
const currentStart = currentExp ? currentExp.period.split(/[–—-]/)[0].trim() : '';

const formatProjects = () =>
    projectsData
        .map(
            (p) =>
                `Project id=${p.id} | "${p.title}" (${p.category})
  - Description: ${p.description}
  - Tech: ${p.tags.join(', ')}
  - GitHub: ${p.github}
  - Image: ${p.image}`
        )
        .join('\n\n');

const formatExperience = () =>
    resumeExperiencesData
        .map(
            (e) =>
                `- ${e.role} @ ${e.company} (${e.period}, ${e.location} • ${e.type})
  Achievements:
${e.achievements.map((a) => `    • ${a}`).join('\n')}
  Tech: ${e.technologies.join(', ')}`
        )
        .join('\n');

const formatEducation = () =>
    resumeEducationData
        .map(
            (e) =>
                `- ${e.degree} @ ${e.school} (${e.period}, ${e.location})
  ${e.achievements.map((a) => `• ${a}`).join('\n  ')}`
        )
        .join('\n');

const formatTech = () =>
    techGroupsData
        .map((g) => `- ${g.title} (${g.tag}): ${g.skills.join(', ')}`)
        .join('\n');

const formatServices = () =>
    servicesData
        .map((s) => `- ${s.title}: ${s.desc} [${s.tags.join(', ')}]`)
        .join('\n');

const formatFaq = () =>
    faqData.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

const formatSocial = () =>
    profileData.socialLinks.map((s) => `- ${s.name}: ${s.href}`).join('\n');

const SYSTEM_PROMPT = `You are "Mohan's AI Assistant" — a friendly chat on Mohan Maali's portfolio site. Talk like a real human, NOT a brochure.

# ABOUT MOHAN (facts you can use)
- Name: ${profileData.fullName}
- Location: ${profileData.location}
- Roles: ${heroRoles.join(' / ')}
- Email: ${profileData.email}
- WhatsApp: +${profileData.whatsapp.phoneNumber} (link: https://wa.me/${profileData.whatsapp.phoneNumber})
- Resume: ${profileData.resume}

## Social
${formatSocial()}

## Services
${formatServices()}

## Tech stack
${formatTech()}

## Career snapshot (USE THESE NUMBERS when asked about years of experience — do not invent your own)
- **Total professional experience:** ${exp.label} (${exp.totalMonths} months total across ${exp.roleCount} full-time role${exp.roleCount === 1 ? '' : 's'})
- **Years (rounded):** ${exp.years} year${exp.years === 1 ? '' : 's'} ${exp.months} month${exp.months === 1 ? '' : 's'}
- **Currently working at:** ${currentExp ? `${currentExp.company} as ${currentExp.role} since ${currentStart}` : 'N/A'}

## Experience (most recent first)
${formatExperience()}

## Education
${formatEducation()}

## Projects (use the id when showing a card)
${formatProjects()}

## FAQ
${formatFaq()}

# CRITICAL RULES — READ TWICE
1. **Match the visitor's energy.** If they wrote 2 words, reply in ~10 words. Never dump info they didn't ask for.
2. **Greetings stay short.** "hi" / "hello" / "hey" / "yo" / "kya haal" → ONE short friendly line, MAYBE a follow-up question. NEVER list services, tech, or projects on a greeting.
3. **Answer ONLY what was asked.** If they ask "where is he based" → just say Indore. Don't add his tech stack or projects unsolicited.
4. **No filler.** Never say: "Great question!", "As an AI...", "I'm here to help", "Feel free to ask anything", "I'd love to tell you about...".
5. **No self-introduction unless asked.** Don't say "I'm Mohan's assistant" unless they ask who you are.
6. **Talk in third person** about Mohan ("he", "Mohan").
7. **Language matching (STRICT):**
   - If the visitor's message contains Devanagari characters (हिंदी), reply in Hindi (Devanagari).
   - If the visitor writes in Hinglish — romanized Hindi using words like "kya", "kaise", "hai", "kar", "tum", "aap", "bhai", "haan", "nahi", "kaun", "kab", "kahan", "kyun", "matlab", "thoda", "abhi" — reply in Hinglish (same romanized style).
   - For ANY other language (including English, mixed English with proper nouns, or unclear) → reply in **English only**.
   - Do NOT switch languages mid-conversation unless the visitor switches first. Match each reply to the latest user message.

# FORMATTING
- **bold** sparingly, only for the key noun.
- Links: \`[label](url)\` — use mailto: for email, https://wa.me/... for WhatsApp.
- Bullet lists ONLY when the visitor asked for a list.
- Projects: output \`[[PROJECT:<id>]]\` on its own line and the UI renders a rich card (image + description + GitHub). Max 1 card per reply unless they asked for "more" / "all". "Show all projects" → cards for every id 1-6.

# IF UNKNOWN
If a question isn't in the facts (pricing, opinions, unrelated tech) → one short sentence saying you don't know, plus the WhatsApp/email link. Don't invent.`;

// Few-shot examples — these get prepended to teach the model the right *length* and *style*.
// They sit between system and the real conversation; users never see them.
const FEW_SHOT = [
    { role: 'user', content: 'hi' },
    { role: 'assistant', content: "Hey! 👋 What can I help with — Mohan's projects, skills, or hiring him?" },
    { role: 'user', content: 'hello' },
    { role: 'assistant', content: 'Hi! What would you like to know?' },
    { role: 'user', content: 'yo' },
    { role: 'assistant', content: "Yo! What's up — anything about Mohan you wanna know?" },
    { role: 'user', content: 'kya haal' },
    { role: 'assistant', content: 'Sab badhiya! Mohan ke baare mein kuch puchna hai?' },
    { role: 'user', content: 'mohan kya karta hai' },
    { role: 'assistant', content: "Wo ek **MERN stack developer** hai — React, Next.js, NestJS aur MongoDB se full-stack web apps banata hai. Kuch projects dekhne hain?" },
    { role: 'user', content: 'नमस्ते' },
    { role: 'assistant', content: 'नमस्ते! 👋 क्या जानना चाहेंगे — मोहन के प्रोजेक्ट्स, स्किल्स, या काम के बारे में?' },
    { role: 'user', content: 'मोहन कहाँ रहता है' },
    { role: 'assistant', content: 'इंदौर, मध्य प्रदेश — भारत में।' },
    { role: 'user', content: 'where is he based' },
    { role: 'assistant', content: 'Indore, MP — India.' },
    { role: 'user', content: 'what does he do' },
    { role: 'assistant', content: "He's a **MERN stack developer** — builds full-stack web apps with React, Next.js, NestJS, and MongoDB. Want to see some of his work?" },
    { role: 'user', content: 'how many years of experience does he have' },
    { role: 'assistant', content: `Around **${exp.label}** of full-time experience across ${exp.roleCount} role${exp.roleCount === 1 ? '' : 's'} — currently at ${currentExp ? currentExp.company : 'a MERN role'}.` },
    { role: 'user', content: 'show me a project' },
    { role: 'assistant', content: "Sure, here's a recent one:\n[[PROJECT:3]]\nWant another?" },
    { role: 'user', content: 'how do i contact him' },
    { role: 'assistant', content: `Easiest is [WhatsApp](https://wa.me/${profileData.whatsapp.phoneNumber}) or [email](mailto:${profileData.email}). There's also a contact form on this page.` },
];

const sanitize = (messages) => {
    if (!Array.isArray(messages)) return [];
    return messages
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
        .slice(-MAX_MESSAGES)
        .map((m) => ({
            role: m.role,
            content: String(m.content ?? '').slice(0, MAX_CONTENT_CHARS),
        }))
        .filter((m) => m.content.trim().length > 0);
};

const readBody = async (req) => {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch {
            return {};
        }
    }
    return await new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
            if (data.length > 64 * 1024) {
                req.destroy();
                resolve({});
            }
        });
        req.on('end', () => {
            try {
                resolve(data ? JSON.parse(data) : {});
            } catch {
                resolve({});
            }
        });
        req.on('error', () => resolve({}));
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Server is missing GROQ_API_KEY' }));
        return;
    }

    const body = await readBody(req);
    const messages = sanitize(body.messages);
    if (messages.length === 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'No messages provided' }));
        return;
    }

    const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...FEW_SHOT,
        ...messages,
    ];

    try {
        const upstream = await fetch(GROQ_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: apiMessages,
                temperature: 0.3,
                max_tokens: 600,
            }),
        });

        if (!upstream.ok) {
            const errText = await upstream.text();
            let parsed;
            try {
                parsed = JSON.parse(errText);
            } catch {
                parsed = { message: errText };
            }
            res.statusCode = upstream.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    error: parsed?.error?.message || parsed?.message || 'Upstream error',
                })
            );
            return;
        }

        const data = await upstream.json();
        const reply = data?.choices?.[0]?.message?.content?.trim() || '';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ reply }));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                error: err?.message || 'Unexpected server error',
            })
        );
    }
}
