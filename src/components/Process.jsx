import React from 'react';
import { motion } from 'framer-motion';
import { processStepsData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export const Process = () => (
    <section id="process" className="py-24 overflow-hidden">
        <SectionHeading
            eyebrow="Process"
            title="How I Work"
            description="A streamlined workflow designed to turn your vision into a high-impact digital product."
        />

        <div className="relative">
            {/* Horizontal timeline rail (lg+) */}
            <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

            {/* Vertical timeline rail — CENTERED (mobile + tablet) */}
            <div className="lg:hidden absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />

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
                                <div className="w-5 h-5 rounded-full bg-white border-[3px] border-zinc-900 shadow-md" />
                            </div>

                            {/* Desktop connector (rail → card) */}
                            <div className="hidden lg:block absolute top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-300" />

                            {/* Mobile/tablet dot (centered on vertical rail) */}
                            <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 z-10">
                                <div className="w-5 h-5 rounded-full bg-white border-[3px] border-zinc-900 shadow-md" />
                            </div>

                            {/* Mobile/tablet connector (dot → card top) */}
                            <div className="lg:hidden absolute top-5 left-1/2 -translate-x-1/2 w-px h-3 bg-zinc-300" />

                            {/* Card */}
                            <div className="group relative bg-[#F8F8F8] hover:bg-white p-6 md:p-7 rounded-[2rem] hover:shadow-xl transition-all duration-500 border border-transparent hover:border-zinc-100 overflow-hidden h-full flex flex-col gap-4">
                                <Icon
                                    aria-hidden="true"
                                    size={150}
                                    strokeWidth={0.8}
                                    className="pointer-events-none select-none absolute -top-6 -right-6 text-zinc-200/70 group-hover:text-zinc-200 transition-colors duration-500"
                                />

                                <div className="relative z-10 flex flex-col gap-4">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                                        Step {step.number}
                                    </span>

                                    <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-zinc-900 group-hover:text-white text-zinc-700 flex items-center justify-center transition-all duration-500 border border-zinc-100 shadow-sm group-hover:rotate-6">
                                        <Icon size={22} strokeWidth={1.75} />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 leading-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-base text-zinc-600 leading-relaxed font-medium">
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
