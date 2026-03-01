import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { educationSummaryData } from '../constants/portfolioData';

export const Education = () => (
    <section className="py-8 w-full">
        <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-white">
                <GraduationCap size={20} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 border-none">Education</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {educationSummaryData.map((edu, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group bg-[#F8F8F8] hover:bg-white p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 hover:shadow-xl transition-all duration-500"
                >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{edu.degree}</h3>
                            <span className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em]">{edu.school}</span>
                        </div>
                        <span className="px-6 py-2 rounded-full bg-white border border-zinc-100 text-zinc-500 text-xs font-bold shadow-sm">
                            {edu.period}
                        </span>
                    </div>
                    <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-2xl">{edu.desc}</p>
                </motion.div>
            ))}
        </div>
    </section>
);
