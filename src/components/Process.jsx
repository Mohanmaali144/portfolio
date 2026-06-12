import React from 'react';
import { motion } from 'framer-motion';
import { processStepsData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { onSpotlightMove } from './ui/spotlight';

export const Process = () => (
    <section id="process" className="py-16 overflow-hidden">
        <SectionHeading
            eyebrow="Process"
            title="How I Work"
            description="A streamlined workflow designed to turn your vision into a high-impact digital product."
        />

        <div className="relative">
            {/* Horizontal timeline rail (lg+) */}
            <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

            {/* Vertical timeline rail — CENTERED (mobile + tablet) */}
            <div className="lg:hidden absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-5">
                {processStepsData.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.12 * i }}
                            className="relative pt-8 lg:pt-12"
                        >
                            {/* Desktop dot (on horizontal rail) */}
                            <div className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-zinc-900 dark:border-white shadow-md" />
                            </div>

                            {/* Desktop connector (rail → card) */}
                            <div className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-300 dark:bg-zinc-700" />

                            {/* Mobile/tablet dot (centered on vertical rail) */}
                            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 z-10">
                                <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-800 border-[3px] border-zinc-900 dark:border-white shadow-md" />
                            </div>

                            {/* Mobile/tablet connector (dot → card top) */}
                            <div className="lg:hidden absolute top-5 left-1/2 -translate-x-1/2 w-px h-3 bg-zinc-300 dark:bg-zinc-700" />

                            {/* Card */}
                            <div onMouseMove={onSpotlightMove} className="group spotlight-card surface relative p-6 md:p-7 rounded-[1.5rem] shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col gap-4">
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none select-none absolute -top-3 -right-1 text-7xl md:text-8xl font-black text-zinc-900/[0.04] dark:text-white/[0.06] tracking-tighter"
                                >
                                    {step.number}
                                </span>

                                <div className="relative z-10 flex flex-col gap-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                                        Step {step.number}
                                    </span>

                                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors duration-300 ring-1 ring-black/[0.03] dark:ring-white/10 shadow-soft">
                                        <Icon size={22} strokeWidth={1.75} />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);
