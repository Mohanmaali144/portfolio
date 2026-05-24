import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';

export const Services = () => {
    const [featured, ...others] = servicesData;
    const FeaturedIcon = featured.icon;

    return (
        <section id="services" className="py-8">
            <SectionHeading eyebrow="Capabilities" title="My Services" />

            <div className="flex flex-col gap-4">
                {/* Featured card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative bg-zinc-900 text-white rounded-[3rem] p-8 md:p-12 overflow-hidden cursor-pointer hover:bg-zinc-950 transition-colors duration-500"
                >
                    <FeaturedIcon
                        size={280}
                        strokeWidth={0.6}
                        className="absolute -right-10 -bottom-16 text-white/[0.06] group-hover:text-white/[0.1] transition-colors duration-700 pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:rotate-6 transition-transform duration-500 border border-white/10">
                                    <FeaturedIcon size={24} strokeWidth={1.5} />
                                </div>
                                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 border border-white/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Core Capability
                                </span>
                            </div>

                            <div className="shrink-0 w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-lg">
                                <ArrowUpRight size={20} strokeWidth={2} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 max-w-3xl">
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white">
                                {featured.title}
                            </h3>
                            <p className="text-base md:text-lg text-white/85 leading-relaxed font-medium">
                                {featured.desc}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {featured.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white backdrop-blur-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Supporting service cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {others.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                                className="group relative bg-[#F8F8F8] rounded-[2.5rem] p-8 flex flex-col gap-6 cursor-pointer hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border border-transparent hover:border-zinc-100"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-50 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-zinc-50">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <ArrowUpRight
                                        size={20}
                                        className="text-zinc-500 group-hover:text-zinc-900 group-hover:rotate-45 transition-all duration-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-base text-zinc-600 leading-relaxed font-medium">
                                        {service.desc}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 group-hover:border-zinc-300 group-hover:text-zinc-900 transition-colors"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
