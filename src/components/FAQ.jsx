import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, ArrowUpRight } from 'lucide-react';
import { faqData } from '../constants/portfolioData';

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-24 px-6 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left: heading + CTA card */}
                <div className="lg:col-span-5">
                    <div className="lg:sticky lg:top-32 flex flex-col gap-6 items-center lg:items-start">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-zinc-300" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                                Frequently Asked
                            </span>
                            <span className="h-px w-8 bg-zinc-300 lg:hidden" />
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.05] text-center lg:text-left"
                        >
                            Frequently<br />
                            Asked<br />
                            Questions
                        </motion.h2>

                        <p className="text-base text-zinc-600 leading-relaxed font-medium max-w-md text-center lg:text-left">
                            Common questions from clients and teams I work with. Don't see your question? Let's chat.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="mt-4 group relative bg-zinc-900 text-white rounded-[2rem] p-6 md:p-7 flex flex-col gap-4 max-w-md overflow-hidden hover:bg-zinc-950 transition-colors duration-500"
                        >
                            <MessageCircle
                                aria-hidden="true"
                                size={180}
                                strokeWidth={0.6}
                                className="pointer-events-none select-none absolute -bottom-10 -right-10 text-white/[0.06] group-hover:text-white/[0.1] transition-colors duration-500"
                            />
                            <div className="relative z-10 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                    <MessageCircle size={18} strokeWidth={1.75} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                                    Still curious?
                                </span>
                            </div>
                            <p className="relative z-10 text-base text-white/85 leading-relaxed font-medium">
                                Drop me a message and I'll get back within 24 hours.
                            </p>
                            <a
                                href="#contact"
                                className="relative z-10 inline-flex items-center gap-2 self-start bg-white text-zinc-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-zinc-100 transition-colors"
                            >
                                Get in touch
                                <ArrowUpRight
                                    size={16}
                                    strokeWidth={2.5}
                                    className="group-hover:rotate-45 transition-transform duration-300"
                                />
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Right: accordion Q&A */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                    {faqData.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.05 * i }}
                                className={`rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
                                    isOpen
                                        ? 'bg-white border-zinc-200 shadow-md'
                                        : 'bg-[#F8F8F8] border-transparent hover:border-zinc-200 hover:bg-white'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                                >
                                    <h3 className="text-base md:text-lg font-bold tracking-tight text-zinc-900 leading-snug pr-2">
                                        {item.q}
                                    </h3>
                                    <div
                                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            isOpen
                                                ? 'bg-zinc-900 text-white rotate-45'
                                                : 'bg-white text-zinc-700 border border-zinc-200'
                                        }`}
                                    >
                                        <Plus size={16} strokeWidth={2.5} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6">
                                                <div className="h-px bg-zinc-200 mb-5" />
                                                <p className="text-base text-zinc-600 leading-relaxed font-medium">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
