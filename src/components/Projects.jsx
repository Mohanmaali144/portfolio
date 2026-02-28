import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Github, Globe } from 'lucide-react';
import { projectsData } from '../constants/portfolioData';

export const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="work" className="py-20 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center mb-16 px-6"
            >
                <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-6">Selected Works</h2>
                <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-zinc-200"></div>
                    <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                        Portfolio 2024
                    </div>
                    <div className="h-px w-8 bg-zinc-200"></div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-4 w-full px-6">
                {projectsData.map((project, i) => (
                    <motion.div
                        key={project.id}
                        layoutId={`project-${project.id}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 * i }}
                        onClick={() => setSelectedProject(project)}
                        className="group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[2rem] mb-4 aspect-[4/4] bg-zinc-50 p-2 flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all duration-700 border border-transparent hover:border-zinc-100">
                            <motion.div
                                layoutId={`image-${project.id}`}
                                className="relative w-full h-full rounded-[1.8rem] overflow-hidden shadow-sm transform group-hover:scale-[1.03] transition-transform duration-700"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                            </motion.div>

                            <div className="absolute top-6 right-6 w-11 h-11 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl">
                                <ArrowUpRight className="text-black" size={20} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 px-3 uppercase">
                            <motion.p
                                layoutId={`category-${project.id}`}
                                className="text-zinc-400 text-[10px] font-black tracking-widest"
                            >
                                {project.category}
                            </motion.p>
                            <motion.h3
                                layoutId={`title-${project.id}`}
                                className="text-xl md:text-lg font-black text-zinc-900 group-hover:text-zinc-600 transition-colors leading-tight tracking-tight"
                            >
                                {project.title}
                            </motion.h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-lg max-h-[90vh] border border-zinc-100 flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-black rounded-full flex items-center justify-center transition-all hover:rotate-90 active:scale-90 shadow-md border border-zinc-200"
                            >
                                <X size={20} strokeWidth={2} />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto w-full max-h-[90vh]">
                                {/* Image Section */}
                                <div className="w-full aspect-video md:aspect-[16/9] relative overflow-hidden bg-zinc-50 border-b border-zinc-100">
                                    <motion.div
                                        layoutId={`image-${selectedProject.id}`}
                                        className="w-full h-full"
                                    >
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent opacity-60"></div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-10 lg:p-12 bg-white">
                                    <div className="space-y-8">
                                        {/* Header */}
                                        <div className="space-y-4">
                                            <motion.div
                                                layoutId={`category-${selectedProject.id}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400"
                                            >
                                                <Globe size={11} />
                                                {selectedProject.category}
                                            </motion.div>
                                            <motion.h3
                                                layoutId={`title-${selectedProject.id}`}
                                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight"
                                            >
                                                {selectedProject.title}
                                            </motion.h3>
                                        </div>

                                        {/* Description */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-base md:text-lg text-zinc-600 leading-relaxed"
                                        >
                                            {selectedProject.description}
                                        </motion.p>

                                        {/* Technologies */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Technologies Used</h4>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="flex flex-wrap gap-2"
                                            >
                                                {selectedProject.tags.map((tag, i) => (
                                                    <div key={i} className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-medium text-zinc-700">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>

                                        {/* Action Buttons */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex flex-col sm:flex-row gap-4 pt-4"
                                        >
                                            <a
                                                href={selectedProject.link}
                                                className="flex-1 bg-black text-white px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg"
                                            >
                                                View Project
                                                <ArrowUpRight size={16} strokeWidth={2} />
                                            </a>
                                            <a
                                                href={selectedProject.github}
                                                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-zinc-200 hover:border-zinc-300"
                                            >
                                                <Github size={16} />
                                                GitHub
                                            </a>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
