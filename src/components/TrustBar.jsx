import React from 'react';
import { motion } from 'framer-motion';
import { trustBarBuildTypesData } from '../constants/portfolioData';

export const TrustBar = () => (
    <section className="py-8 bg-white relative overflow-hidden trust-section">
        {/* Subtle Section Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-zinc-200 to-transparent opacity-50"></div>

        <div className="flex flex-col items-center mb-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-50 px-5 py-2 rounded-full border border-zinc-100/50 shadow-sm"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                    What I Can Build
                </span>
            </motion.div>
        </div>

        <div className="relative">
            {/* Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-full overflow-hidden">
                <div className="flex gap-24 items-center whitespace-nowrap marquee-track py-4">
                    {trustBarBuildTypesData.map((brand, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group/brand cursor-pointer shrink-0">
                            <span className="text-3xl md:text-5xl font-black text-zinc-200 group-hover/brand:text-black transition-all duration-700 tracking-tighter select-none uppercase">
                                {brand.name}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-100 group-hover/brand:text-zinc-400 transition-all duration-700 select-none">
                                {brand.desc}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {trustBarBuildTypesData.map((brand, i) => (
                        <div key={`dup-${i}`} className="flex flex-col items-center gap-1 group/brand cursor-pointer shrink-0">
                            <span className="text-3xl md:text-5xl font-black text-zinc-200 group-hover/brand:text-black transition-all duration-700 tracking-tighter select-none uppercase">
                                {brand.name}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-100 group-hover/brand:text-zinc-400 transition-all duration-700 select-none">
                                {brand.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Subtle Section Divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-zinc-200 to-transparent opacity-50"></div>

        <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .marquee-track {
                display: flex;
                width: max-content;
                gap: 6rem;
                animation: marquee-scroll 40s linear infinite;
            }
            /* Stop animation ONLY when hovering the logos/track, not the whole section */
            .marquee-track:hover {
                animation-play-state: paused !important;
            }
        `}} />
    </section>
);
