import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../constants/portfolioData';
import { SectionHeading } from './ui/SectionHeading';
import { onSpotlightMove } from './ui/spotlight';

export const Projects = () => (
    <section id="work" className="py-8">
        <SectionHeading eyebrow="Portfolio · 2026" title="Selected Works" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projectsData.map((project, i) => {
                // Prefer a real live-demo URL; fall back to the repo so the card never links to nowhere.
                const href = project.link && project.link !== '#' ? project.link : project.github;

                return (
                <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                >
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={onSpotlightMove}
                        className="group spotlight-card block surface rounded-[1.5rem] p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="relative overflow-hidden rounded-[1.25rem] aspect-[4/3] bg-zinc-100 mb-4 ring-1 ring-black/5 dark:ring-white/10">
                            <img
                                src={project.image}
                                alt={`${project.title} — ${project.category}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 border border-white/50 shadow-sm">
                                {String(i + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                            </div>

                            <div className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                <ArrowUpRight size={18} strokeWidth={2} className="text-zinc-900 dark:text-zinc-100" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 px-2 pb-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                                {project.category}
                            </span>
                            <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 font-medium">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 shadow-soft group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>
                    </a>
                </motion.article>
                );
            })}
        </div>
    </section>
);
