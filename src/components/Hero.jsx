import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Mail } from 'lucide-react';
import { heroRoles, profileData } from '../constants/portfolioData';

const TypingAnimation = ({ roles }) => {
    const [currentRole, setCurrentRole] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const role = roles[currentRole];
        const timeout = setTimeout(() => {
            if (!isDeleting && currentText === role) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentRole((prev) => (prev + 1) % roles.length);
            } else {
                setCurrentText(role.slice(0, isDeleting ? currentText.length - 1 : currentText.length + 1));
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentRole, roles]);

    return (
        <span className="text-zinc-600 dark:text-zinc-400">
            {currentText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export const Hero = () => {
    return (
        <section className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">
            {/* Avatar & Status */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="relative mb-6"
            >
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl">
                        <img
                            src={`${profileData?.image}`}
                            alt={`${profileData.fullName} — ${heroRoles[0]}`}
                            width={160}
                            height={160}
                            fetchpriority="high"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute -right-4 top-4 bg-white dark:bg-zinc-800 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {/* <span className="text-sm font-bold tracking-tight text-zinc-900">Available</span> */}
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-800 px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400"
                    >
                        <MapPin size={12} />
                        {profileData.location}
                    </motion.div>
                </div>
            </motion.div>

            {/* Name & Role */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
            >
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white mb-2">
                    {profileData.fullName}
                </h1>
                <div className="text-xl md:text-2xl font-medium">
                    <TypingAnimation roles={heroRoles} />
                </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-zinc-900 dark:text-white"
            >
                Transforming business ideas <br />
                into digital products.
            </motion.h2>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-4 mb-8"
            >
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href='#work'
                    className="bg-black text-white dark:bg-white dark:text-zinc-900 px-10 py-4 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl shadow-zinc-200 dark:shadow-black/40 flex items-center gap-2"
                >
                    Latest Work
                    <ExternalLink size={16} />
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href='#contact'
                    className="bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 px-10 py-4 rounded-full text-sm font-bold border border-zinc-100 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm flex items-center gap-2"
                >
                    Contact Me
                    <Mail size={16} />
                </motion.a>
            </motion.div>

        </section>
    );
};
