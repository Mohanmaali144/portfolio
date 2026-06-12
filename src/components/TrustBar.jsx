import React from 'react';
import { trustBarBuildTypesData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export const TrustBar = () => (
    <section className="py-8 bg-white dark:bg-transparent relative overflow-hidden trust-section">
        {/* Subtle Section Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-zinc-200 dark:from-white/15 to-transparent opacity-50"></div>

        <SectionHeading eyebrow="Build Capacity" title="What I Can Build" />

        <div className="relative">
            {/* Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#09090B] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#09090B] to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-full overflow-hidden">
                <div className="flex gap-24 items-center whitespace-nowrap marquee-track py-4">
                    {trustBarBuildTypesData.map((brand, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group/brand cursor-pointer shrink-0">
                            <span className="text-2xl md:text-4xl font-extrabold text-zinc-300 dark:text-zinc-600 group-hover/brand:text-zinc-500 dark:group-hover/brand:text-zinc-300 transition-colors duration-300 tracking-tight select-none uppercase">
                                {brand.name}
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-200 dark:text-zinc-700 group-hover/brand:text-zinc-400 dark:group-hover/brand:text-zinc-500 transition-colors duration-300 select-none">
                                {brand.desc}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {trustBarBuildTypesData.map((brand, i) => (
                        <div key={`dup-${i}`} className="flex flex-col items-center gap-1 group/brand cursor-pointer shrink-0">
                            <span className="text-2xl md:text-4xl font-extrabold text-zinc-300 dark:text-zinc-600 group-hover/brand:text-zinc-500 dark:group-hover/brand:text-zinc-300 transition-colors duration-300 tracking-tight select-none uppercase">
                                {brand.name}
                            </span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-200 dark:text-zinc-700 group-hover/brand:text-zinc-400 dark:group-hover/brand:text-zinc-500 transition-colors duration-300 select-none">
                                {brand.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Subtle Section Divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-zinc-200 dark:from-white/15 to-transparent opacity-50"></div>

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
