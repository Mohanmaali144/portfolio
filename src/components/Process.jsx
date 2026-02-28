import React from 'react';
import { motion } from 'framer-motion';
import { processStepsData } from '../constants/portfolioData';

export const Process = () => (
    <section id="process" className="py-24 overflow-hidden">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-20 px-6"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">How I Work</h2>
            <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 inline-block">
                Process
            </div>
            <p className="text-zinc-500 font-medium text-center max-w-lg">
                A streamlined workflow designed to turn your vision into a high-impact digital product.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-0">
            {processStepsData.map((step, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 * i }}
                    className="group relative bg-[#F8F8F8] p-10 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:rotate-12 transition-all duration-500">
                            <step.icon size={28} strokeWidth={1.5} />
                        </div>
                        <span className="text-5xl font-black text-zinc-100 group-hover:text-zinc-900/5 transition-colors leading-none tracking-tight">
                            {step.number}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 relative z-10">
                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900">{step.title}</h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            {step.desc}
                        </p>
                    </div>

                    {/* Connecting Line Decoration */}
                    {i < processStepsData.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-zinc-200 z-0"></div>
                    )}
                </motion.div>
            ))}
        </div>
    </section>
);
