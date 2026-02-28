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
        <span className="text-zinc-600">
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
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                            alt="Profile"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute -right-4 top-4 bg-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold tracking-tight text-zinc-900">Available</span>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 text-xs text-zinc-600"
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
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-2">
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
                className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-zinc-900"
            >
                Building digital products, <br />
                brands,
            </motion.h2>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-4 mb-8"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
                >
                    Latest Work
                    <ExternalLink size={16} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-zinc-900 px-10 py-4 rounded-full text-sm font-bold border border-zinc-100 hover:bg-zinc-50 transition-all shadow-sm flex items-center gap-2"
                >
                    Contact Me
                    <Mail size={16} />
                </motion.button>
            </motion.div>

        </section>
    );
};
