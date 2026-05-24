import React from 'react';
import { motion } from 'framer-motion';
import { techGroupsData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export const TechStack = () => (
    <section id="tech" className="py-8 overflow-hidden">
        <SectionHeading eyebrow="Technologies & Tools" title="Technical Stack" />

        <div className="border-t border-zinc-200">
            {techGroupsData.map((group, i) => {
                const Icon = group.icon;
                return (
                    <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 * i }}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 px-4 md:px-6 border-b border-zinc-200 hover:bg-[#F8F8F8] transition-colors duration-500"
                    >
                        <div className="md:col-span-4 flex items-start gap-4">
                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#F8F8F8] group-hover:bg-zinc-900 group-hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-500 border border-zinc-100 shadow-sm group-hover:rotate-6">
                                <Icon size={22} strokeWidth={1.75} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 leading-tight">
                                    {group.title}
                                </h3>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
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
                                    className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm"
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
