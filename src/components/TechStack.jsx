import React from 'react';
import { motion } from 'framer-motion';
import { techGroupsData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export const TechStack = () => (
    <section id="tech" className="py-8 overflow-hidden">
        <SectionHeading eyebrow="Technologies & Tools" title="Technical Stack" />

        <div className="surface rounded-[1.75rem] overflow-hidden shadow-soft">
            {techGroupsData.map((group, i) => {
                const Icon = group.icon;
                return (
                    <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 * i }}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 px-6 md:px-8 border-b border-zinc-200/70 dark:border-white/10 last:border-b-0 hover:bg-zinc-50/60 dark:hover:bg-white/5 transition-colors duration-200"
                    >
                        <div className="md:col-span-4 flex items-start gap-4">
                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors duration-300 ring-1 ring-black/[0.03] dark:ring-white/10 shadow-soft">
                                <Icon size={22} strokeWidth={1.75} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                                    {group.title}
                                </h3>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                                    {group.skills.length} Technologies
                                </span>
                            </div>
                        </div>

                        <div className="md:col-span-8 flex flex-wrap gap-2 items-start">
                            {group.skills.map((skill, j) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.03 * j }}
                                    className="px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-soft hover:border-zinc-900 hover:text-zinc-900 dark:hover:border-white dark:hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </section>
);
