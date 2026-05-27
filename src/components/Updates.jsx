import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    GitCommit,
    Github,
    RefreshCw,
    Sparkles,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';

const ENDPOINT = '/api/github-updates';

const formatRelative = (iso) => {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return '';
    const diff = Date.now() - then;
    const sec = Math.round(diff / 1000);
    if (sec < 60) return 'just now';
    const min = Math.round(sec / 60);
    if (min < 60) return `${min} min ago`;
    const hr = Math.round(min / 60);
    if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
    const day = Math.round(hr / 24);
    if (day < 30) return `${day} day${day === 1 ? '' : 's'} ago`;
    const mon = Math.round(day / 30);
    if (mon < 12) return `${mon} month${mon === 1 ? '' : 's'} ago`;
    const yr = Math.round(mon / 12);
    return `${yr} year${yr === 1 ? '' : 's'} ago`;
};

const SkeletonCard = () => (
    <div className="rounded-2xl border border-zinc-200 bg-[#F8F8F8] p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-zinc-200" />
            <div className="h-3 w-24 rounded bg-zinc-200" />
            <div className="h-3 w-16 rounded bg-zinc-200 ml-auto" />
        </div>
        <div className="h-4 w-full rounded bg-zinc-200 mb-2" />
        <div className="h-4 w-3/4 rounded bg-zinc-200" />
    </div>
);

const CommitCard = ({ commit, index }) => (
    <motion.a
        href={commit.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, delay: 0.05 * index }}
        className="group block rounded-2xl border border-zinc-200 bg-[#F8F8F8] hover:bg-white hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4"
    >
        <div className="flex items-center gap-2 mb-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
            <GitCommit className="w-3.5 h-3.5 text-zinc-700" />
            <span className="text-zinc-900 font-semibold normal-case tracking-normal text-[12.5px]">
                {commit.repo}
            </span>
            {commit.repoLanguage && (
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-200/70 text-zinc-700 normal-case tracking-normal">
                    {commit.repoLanguage}
                </span>
            )}
            <span className="ml-auto normal-case tracking-normal text-zinc-400">
                {formatRelative(commit.date)}
            </span>
        </div>

        <p className="text-[14px] text-zinc-900 leading-relaxed font-medium">
            {commit.polished}
        </p>

        {commit.polished !== commit.message && (
            <p className="mt-1.5 text-[11.5px] text-zinc-500 italic line-clamp-1">
                <span className="not-italic font-mono text-zinc-400 mr-1.5">
                    {commit.sha}
                </span>
                {commit.message}
            </p>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 group-hover:text-zinc-900 transition">
            <span>View on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
    </motion.a>
);

export const Updates = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(ENDPOINT, { timeout: 20000 });
            setData(res.data);
        } catch (e) {
            setError(
                e.response?.data?.error ||
                    e.message ||
                    'Could not load GitHub activity.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const commits = data?.commits || [];

    return (
        <section id="updates" className="py-8">
            <SectionHeading
                eyebrow="Live · From GitHub"
                title="Recent Updates"
                description="A live feed of the latest commits across my repositories, with AI-polished summaries so you can see what's been shipping."
            />

            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                        <Github className="w-4 h-4 text-zinc-700" />
                        <a
                            href={data?.profileUrl || 'https://github.com/mohanmaali144'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-zinc-900 hover:underline underline-offset-2"
                        >
                            @{data?.user || 'mohanmaali144'}
                        </a>
                        {data?.aiPolished && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full bg-zinc-900 text-white ml-1">
                                <Sparkles className="w-3 h-3" /> AI polished
                            </span>
                        )}
                        {data?.stale && (
                            <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                Cached
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={load}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-zinc-700 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                        <RefreshCw
                            className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </button>
                </div>

                {error && !loading && commits.length === 0 && (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center">
                        <p className="text-sm text-zinc-700 mb-2">
                            Couldn&apos;t reach GitHub right now.
                        </p>
                        <p className="text-xs text-zinc-500 mb-4">{error}</p>
                        <a
                            href="https://github.com/mohanmaali144"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-zinc-900 hover:underline"
                        >
                            Visit profile directly
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                )}

                {loading && commits.length === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[0, 1, 2, 3].map((i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {commits.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {commits.map((c, i) => (
                            <CommitCard key={c.sha + c.date} commit={c} index={i} />
                        ))}
                    </div>
                )}

                {!loading && !error && commits.length === 0 && (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
                        No public commits found in the last few days.
                    </div>
                )}
            </div>
        </section>
    );
};
