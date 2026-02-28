import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Music, Briefcase, Award, Globe } from 'lucide-react';
import { aboutBentoData } from '../constants/portfolioData';

export const BentoAbout = () => (
    <section id="about" className="py-24 overflow-hidden px-6 md:px-0">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mb-16"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">A Little More About Me</h2>
            <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 inline-block">
                Beyond the Code
            </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[12rem]">
            {aboutBentoData.map((item) => (
                <motion.div
                    key={item.id}
                    initial={item.animation.initial}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={item.animation.transition}
                    className={item.className}
                >
                    {item.id === 'location' && (
                        <>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                    <MapPin size={18} />
                                    <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                                </div>
                                <h3 className="text-4xl font-bold tracking-tighter text-zinc-900">{item.title}</h3>
                                <p className="text-zinc-500 mt-4 max-w-xs font-medium">{item.description}</p>
                            </div>
                            <div className="relative z-10 flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-bold text-zinc-900">{item.status.text}</span>
                            </div>
                            <Globe size={300} strokeWidth={0.5} className="absolute -bottom-20 -right-20 text-zinc-50 opacity-[0.05] transition-opacity duration-700 pointer-events-none" />
                        </>
                    )}

                    {item.id === 'experience' && (
                        <>
                            <item.icon className="text-white mb-2" size={32} />
                            <span className="text-4xl font-black text-white tracking-tighter">{item.value}</span>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
                        </>
                    )}

                    {item.id === 'projects' && (
                        <>
                            <item.icon className="text-zinc-400 group-hover:text-zinc-900 transition-colors" size={32} />
                            <span className="text-4xl font-black text-zinc-900 tracking-tighter">{item.value}</span>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.label}</span>
                        </>
                    )}

                    {item.id === 'music' && (
                        <>
                            <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg animate-spin-slow">
                                <item.icon size={28} strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-1">{item.label}</span>
                                <h4 className="text-xl font-bold text-zinc-900 tracking-tight">{item.title}</h4>
                                <span className="text-zinc-500 text-xs font-medium">{item.subtitle}</span>
                            </div>
                        </>
                    )}
                </motion.div>
            ))}
        </div>

        <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 8s linear infinite;
            }
        `}} />
    </section>
);
