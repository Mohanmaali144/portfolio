import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { onSpotlightMove } from './ui/spotlight';

export const Services = () => {
    return (
        <section id="services" className="py-8">
            <SectionHeading eyebrow="Capabilities" title="My Services" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {servicesData.map((service, i) => {
                    const Icon = service.icon;
                    return (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.06 * i }}
                            onMouseMove={onSpotlightMove}
                            className="group spotlight-card surface relative rounded-2xl p-5 md:p-6 flex flex-col gap-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 ring-1 ring-black/[0.03] dark:ring-white/10 shadow-soft group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 transition-colors duration-300">
                                    <Icon size={20} strokeWidth={1.6} />
                                </div>
                                <ArrowUpRight
                                    size={18}
                                    className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-base md:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium line-clamp-2">
                                    {service.desc}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
