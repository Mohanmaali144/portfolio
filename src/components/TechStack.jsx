import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { techGroupsData } from '../constants/portfolioData';

export const TechStack = () => (
    <section id="tech" className="py-24 flex flex-col items-center overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">
                Technical Stack
            </h2>
            <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 inline-block">
                Technologies & Tools
            </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-6 md:px-0">
            {techGroupsData.map((group, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="group relative bg-[#F8F8F8] p-10 md:py-16 flex flex-col gap-10 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-default rounded-[2.5rem] overflow-hidden"
                >
                    {/* Watermark Tag */}
                    <div className="absolute top-8 right-8 flex items-center gap-2 opacity-5 group-hover:opacity-20 transition-all duration-500">
                        <Terminal size={12} className="group-hover:text-black" />
                        <span className="text-[9px] font-black tracking-[0.3em] group-hover:text-black">{group.tag}</span>
                    </div>

                    {/* Massive Background Icon */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-700 pointer-events-none select-none">
                        <group.icon size={260} strokeWidth={1} className="group-hover:text-black transition-colors" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:rotate-12 transition-all duration-500">
                            <group.icon size={28} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-zinc-400 transition-colors uppercase">
                            {group.title}
                        </h3>
                    </div>

                    <div className="relative z-10 flex flex-col gap-4">
                        {group.skills.map((skill, j) => (
                            <div key={j} className="flex items-center gap-4 group/skill">
                                <div className="w-1.5 h-[1.5px] bg-zinc-200 group-hover:bg-black group-hover:w-4 transition-all duration-500"></div>
                                <span className="text-xl font-bold text-zinc-800 tracking-tight group-hover:translate-x-1 transition-transform">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Industrial Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-zinc-50 group-hover:bg-black transition-all duration-500"></div>
                </motion.div>
            ))}
        </div>
    </section>
);
