import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { resumeExperiencesData, resumeEducationData } from '../constants/portfolioData';

const TimelineItem = ({ children, delay = 0, isLast = false }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="relative flex items-start gap-6"
    >
        {/* Timeline Dot and Line */}
        <div className="relative flex-shrink-0">
            <div className="w-4 h-4 bg-zinc-900 rounded-full border-4 border-white shadow-lg"></div>
            {!isLast && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-zinc-200 to-transparent"></div>
            )}
        </div>
        {children}
    </motion.div>
);

const ExperienceCard = ({ exp, index }) => (
    <motion.div
        whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-[2rem] p-8 border border-zinc-100/50 hover:border-zinc-200 transition-all duration-500 cursor-pointer group"
    >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Briefcase size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                        {exp.type}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">
                    {exp.role}
                </h3>
                <div className="flex items-center gap-4 text-zinc-500">
                    <span className="font-medium">{exp.company}</span>
                    <span className="flex items-center gap-1 text-sm">
                        <MapPin size={14} />
                        {exp.location}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
                    <Calendar size={14} />
                    {exp.period}
                </span>
            </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Key Achievements</h4>
            <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-zinc-600 text-sm leading-relaxed">{achievement}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Technologies */}
        <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 bg-zinc-50 text-zinc-600 text-xs font-medium rounded-full border border-zinc-100 hover:bg-zinc-100 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const EducationCard = ({ edu, index }) => (
    <motion.div
        whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-[2rem] p-8 border border-zinc-100/50 hover:border-zinc-200 transition-all duration-500 cursor-pointer group"
    >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <GraduationCap size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                        {edu.type}
                    </span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">
                    {edu.degree}
                </h3>
                <div className="flex items-center gap-4 text-zinc-500">
                    <span className="font-medium">{edu.school}</span>
                    <span className="flex items-center gap-1 text-sm">
                        <MapPin size={14} />
                        {edu.location}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
                    <Calendar size={14} />
                    {edu.period}
                </span>
            </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Achievements</h4>
            <ul className="space-y-2">
                {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-zinc-600 text-sm leading-relaxed">{achievement}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Coursework */}
        <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3">Relevant Coursework</h4>
            <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course, i) => (
                    <span
                        key={i}
                        className="px-3 py-1 bg-zinc-50 text-zinc-600 text-xs font-medium rounded-full border border-zinc-100 hover:bg-zinc-100 transition-colors"
                    >
                        {course}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export const Resume = () => (
    <section className="py-24 px-6 md:px-0">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">
                Resume & Journey
            </h2>
            <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 inline-block">
                Experience & Education
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Experience Column */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-lg">
                        <Briefcase size={20} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Work Experience</h3>
                </motion.div>

                <div className="space-y-8">
                    {resumeExperiencesData.map((exp, index) => (
                        <TimelineItem key={index} delay={index * 0.1} isLast={index === resumeExperiencesData.length - 1}>
                            <ExperienceCard exp={exp} index={index} />
                        </TimelineItem>
                    ))}
                </div>
            </div>

            {/* Education Column */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-lg">
                        <GraduationCap size={20} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Education</h3>
                </motion.div>

                <div className="space-y-8">
                    {resumeEducationData.map((edu, index) => (
                        <TimelineItem key={index} delay={index * 0.1} isLast={index === resumeEducationData.length - 1}>
                            <EducationCard edu={edu} index={index} />
                        </TimelineItem>
                    ))}
                </div>
            </div>
        </div>
    </section>
);
