import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, ExternalLink, Github, Loader2, Send, Sparkles, X } from 'lucide-react';
import { projectsById, suggestedQuestions } from '../constants/aiContext';
import { profileData } from '../constants/portfolioData';

const CHAT_ENDPOINT = '/api/chat';

const greeting = `Hey! 👋 I'm Mohan's assistant. What would you like to know?`;

const renderInline = (text) => {
    const tokens = [];
    const regex = /(!\[([^\]]*)\]\(([^)\s]+)\))|(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(\*([^*\n]+)\*)|(`([^`\n]+)`)/g;
    let last = 0;
    let key = 0;
    let m;
    while ((m = regex.exec(text)) !== null) {
        if (m.index > last) tokens.push(text.slice(last, m.index));
        if (m[1]) {
            tokens.push(
                <img
                    key={`img-${key++}`}
                    src={m[3]}
                    alt={m[2]}
                    className="my-2 rounded-lg max-w-full h-auto border border-zinc-200"
                />
            );
        } else if (m[4]) {
            tokens.push(
                <a
                    key={`a-${key++}`}
                    href={m[6]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium"
                >
                    {m[5]}
                </a>
            );
        } else if (m[7]) {
            tokens.push(
                <strong key={`b-${key++}`} className="font-semibold text-zinc-900">
                    {m[8]}
                </strong>
            );
        } else if (m[9]) {
            tokens.push(
                <em key={`i-${key++}`} className="italic">
                    {m[10]}
                </em>
            );
        } else if (m[11]) {
            tokens.push(
                <code
                    key={`c-${key++}`}
                    className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-900 text-[12px] font-mono"
                >
                    {m[12]}
                </code>
            );
        }
        last = m.index + m[0].length;
    }
    if (last < text.length) tokens.push(text.slice(last));
    return tokens;
};

const renderMarkdownBlock = (text, baseKey) => {
    const blocks = text.split(/\n{2,}/);
    return blocks.map((block, bi) => {
        const lines = block.split('\n');
        const isList = lines.every((l) => /^\s*[-*]\s+/.test(l)) && lines.length > 0;
        if (isList) {
            return (
                <ul key={`${baseKey}-ul-${bi}`} className="list-disc pl-5 space-y-1 my-2">
                    {lines.map((l, li) => (
                        <li key={li}>{renderInline(l.replace(/^\s*[-*]\s+/, ''))}</li>
                    ))}
                </ul>
            );
        }
        return (
            <p key={`${baseKey}-p-${bi}`} className="my-1.5 first:mt-0 last:mb-0 leading-relaxed">
                {lines.map((l, li) => (
                    <React.Fragment key={li}>
                        {renderInline(l)}
                        {li < lines.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </p>
        );
    });
};

const ProjectCard = ({ project }) => (
    <div className="my-2 rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
        <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-100">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>
        <div className="p-3">
            <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold text-zinc-900 leading-tight">
                    {project.title}
                </h4>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                    {project.category}
                </span>
            </div>
            <p className="mt-1.5 text-[12.5px] text-zinc-600 leading-relaxed line-clamp-3">
                {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
                {project.tags.map((t) => (
                    <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200"
                    >
                        {t}
                    </span>
                ))}
            </div>
            <div className="mt-2.5 flex items-center gap-3 text-[12px]">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-700 hover:text-black font-medium"
                >
                    <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                {project.link && project.link !== '#' && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                )}
            </div>
        </div>
    </div>
);

// Trim the visible window so a partially-typed `[[PROJECT:...` token never
// flashes as plain text on its way to becoming a card.
const safeDisplayText = (full, length) => {
    let display = full.slice(0, length);
    const lastOpen = display.lastIndexOf('[[');
    if (lastOpen !== -1) {
        const after = display.slice(lastOpen);
        if (!after.includes(']]')) {
            display = display.slice(0, lastOpen);
        }
    }
    return display;
};

const renderBotMessage = (text) => {
    const parts = [];
    const regex = /\[\[PROJECT:(\d+)\]\]/g;
    let last = 0;
    let m;
    let i = 0;
    while ((m = regex.exec(text)) !== null) {
        if (m.index > last) {
            parts.push({ type: 'md', text: text.slice(last, m.index), key: i++ });
        }
        parts.push({ type: 'project', id: Number(m[1]), key: i++ });
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push({ type: 'md', text: text.slice(last), key: i++ });

    return parts.map((p) => {
        if (p.type === 'project') {
            const project = projectsById[p.id];
            if (!project) return null;
            return <ProjectCard key={p.key} project={project} />;
        }
        const cleaned = p.text.replace(/^\n+|\n+$/g, '');
        if (!cleaned) return null;
        return (
            <div key={p.key} className="text-[13.5px] text-zinc-800">
                {renderMarkdownBlock(cleaned, p.key)}
            </div>
        );
    });
};

export const AiChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: greeting },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // typing: { fullContent: string, length: number } while a bot message is being typed out
    const [typing, setTyping] = useState(null);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading, isOpen, typing]);

    // Typing-effect advancer: progressively reveals the bot reply ~3 chars / 18ms.
    useEffect(() => {
        if (!typing) return;
        const done = typing.length >= typing.fullContent.length;
        const t = setTimeout(() => {
            if (done) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: typing.fullContent },
                ]);
                setTyping(null);
            } else {
                setTyping((cur) =>
                    cur
                        ? {
                              ...cur,
                              length: Math.min(cur.length + 3, cur.fullContent.length),
                          }
                        : cur
                );
            }
        }, done ? 120 : 18);
        return () => clearTimeout(t);
    }, [typing]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            const t = setTimeout(() => inputRef.current?.focus(), 250);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const send = async (textOverride) => {
        const text = (textOverride ?? input).trim();
        if (!text || loading || typing) return;

        const next = [...messages, { role: 'user', content: text }];
        setMessages(next);
        setInput('');
        setError('');
        setLoading(true);

        try {
            // Only send the visible conversation — system prompt + few-shot
            // live on the server so the GROQ key never reaches the browser.
            const apiMessages = next
                .filter((m) => m.role === 'user' || m.role === 'assistant')
                .map((m) => ({ role: m.role, content: m.content }));

            const res = await axios.post(
                CHAT_ENDPOINT,
                { messages: apiMessages },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 30000,
                }
            );

            const reply =
                res.data?.reply?.trim() ||
                "Sorry, I couldn't generate a reply. Try again?";
            setLoading(false);
            setTyping({ fullContent: reply, length: 0 });
        } catch (e) {
            const msg =
                e.response?.data?.error ||
                e.message ||
                'Something went wrong.';
            setError(msg);
            setLoading(false);
            setTyping({
                fullContent: `Hmm, something went wrong on my end. You can reach Mohan directly at [${profileData.email}](mailto:${profileData.email}) or on [WhatsApp](https://wa.me/${profileData.whatsapp.phoneNumber}).`,
                length: 0,
            });
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    const skipTyping = () => {
        if (!typing) return;
        setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: typing.fullContent },
        ]);
        setTyping(null);
    };

    const showSuggestions = messages.length === 1 && !loading && !typing;
    const isBusy = loading || !!typing;

    return (
        <>
            {/* Floating launcher — sits above WhatsApp button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="ai-fab"
                        type="button"
                        onClick={() => setIsOpen(true)}
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 10 }}
                        whileHover={{ scale: 1.08, translateY: -3 }}
                        whileTap={{ scale: 0.92 }}
                        className="fixed bottom-30 right-10 z-[1000] w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.35)] group overflow-visible"
                        aria-label="Open AI assistant"
                    >
                        <span className="absolute inset-0 rounded-full bg-zinc-900/40 animate-ping opacity-30 scale-125 pointer-events-none" />
                        <Sparkles className="w-7 h-7 relative z-10" />
                        <div className="absolute right-20 bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none shadow-xl whitespace-nowrap">
                            Ask the AI
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="ai-window"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                        className="fixed z-[1001] bottom-6 right-4 sm:right-6 w-[min(92vw,400px)] h-[min(80vh,600px)] bg-white rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.45)] border border-zinc-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
                            <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/20">
                                <Bot className="w-5 h-5 text-white" />
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-zinc-900" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold leading-tight">
                                    Mohan&apos;s AI Assistant
                                </div>
                                <div className="text-[11px] text-zinc-300 leading-tight">
                                    Online · usually replies instantly
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/10 transition"
                                aria-label="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto px-4 py-4 bg-[radial-gradient(ellipse_at_top,rgba(244,244,245,0.8),rgba(255,255,255,1)_60%)]"
                        >
                            <div className="space-y-3">
                                {messages.map((m, i) =>
                                    m.role === 'user' ? (
                                        <div key={i} className="flex justify-end">
                                            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-zinc-900 text-white px-3.5 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap shadow-sm">
                                                {m.content}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={i} className="flex justify-start gap-2">
                                            <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center mt-0.5">
                                                <Bot className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-3.5 py-2 shadow-sm">
                                                {renderBotMessage(m.content)}
                                            </div>
                                        </div>
                                    )
                                )}

                                {loading && (
                                    <div className="flex justify-start gap-2">
                                        <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center mt-0.5">
                                            <Bot className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-3.5 py-2.5 shadow-sm flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                                        </div>
                                    </div>
                                )}

                                {typing && (
                                    <div
                                        className="flex justify-start gap-2 cursor-pointer"
                                        onClick={skipTyping}
                                        title="Tap to skip"
                                    >
                                        <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center mt-0.5">
                                            <Bot className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-3.5 py-2 shadow-sm">
                                            {renderBotMessage(
                                                safeDisplayText(typing.fullContent, typing.length)
                                            )}
                                            <span className="inline-block w-[2px] h-[14px] align-[-2px] ml-0.5 bg-zinc-700 animate-pulse" />
                                        </div>
                                    </div>
                                )}

                                {showSuggestions && (
                                    <div className="pt-1 flex flex-wrap gap-2">
                                        {suggestedQuestions.map((q) => (
                                            <button
                                                key={q}
                                                type="button"
                                                onClick={() => send(q)}
                                                className="text-[12px] px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="border-t border-zinc-200 bg-white p-3">
                            {error && (
                                <div className="mb-2 text-[11px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
                                    {error}
                                </div>
                            )}
                            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 focus-within:border-zinc-400 focus-within:bg-white transition px-3 py-1.5">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Ask about projects, skills, hiring..."
                                    rows={1}
                                    className="flex-1 resize-none bg-transparent outline-none text-[13.5px] text-zinc-900 placeholder:text-zinc-400 leading-6 py-1.5 max-h-28 block"
                                    disabled={isBusy}
                                />
                                <button
                                    type="button"
                                    onClick={() => send()}
                                    disabled={isBusy || !input.trim()}
                                    className="shrink-0 w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black transition"
                                    aria-label="Send"
                                >
                                    {isBusy ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <div className="mt-1.5 text-[10px] text-zinc-400 text-center">
                                {/* Powered by Groq · Llama 3.3 */}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
