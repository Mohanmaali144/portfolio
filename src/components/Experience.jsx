import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experienceSummaryData } from '../constants/portfolioData';

export const Experience = () => (
    <section className="py-8 w-full">
        <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-lg">
                <Briefcase size={20} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Experience</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
            {experienceSummaryData.map((exp, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] border border-slate-50 dark:border-slate-800 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-all duration-500"
                >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{exp.role}</h3>
                            <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">{exp.company}</span>
                        </div>
                        <span className="px-6 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold shadow-sm">
                            {exp.period}
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">{exp.desc}</p>
                </motion.div>
            ))}
        </div>
    </section>
);
