import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../constants/portfolioData';

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "Tech Stack", href: "#tech" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="w-full bg-transparent">
            <div className="max-w-full mx-auto px-6 md:px-12 pt-10 pb-10">
                {/* Main Footer Content */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-16 border-b border-zinc-200/60 pb-12">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6 text-left max-w-lg">
                        <div className="text-3xl font-black tracking-tighter cursor-pointer flex items-center group" onClick={scrollToTop}>
                            <span className="text-black group-hover:text-zinc-500 transition-colors uppercase">md.</span>
                            <div className="w-2 h-2 bg-black rounded-full ml-1 self-end mb-2 transition-colors"></div>
                        </div>
                        <p className="text-xl md:text-2xl font-medium text-zinc-900 leading-[1.2] tracking-tight">
                            Crafting exceptional digital experiences through modern design and clean code.
                        </p>
                    </div>

                    {/* Quick Links & Socials Container */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-24">
                        {/* Quick Links Column */}
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Quick Links</span>
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="group text-sm font-bold text-zinc-900 hover:text-zinc-500 transition-all flex items-center gap-2"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Icons Column */}
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Follow Me</span>
                            <div className="flex items-center gap-3">
                                {profileData.socialLinks.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className="group w-12 h-12 rounded-full bg-white flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all duration-500 hover:scale-110 shadow-sm border border-zinc-50 relative overflow-hidden"
                                        title={social.name}
                                    >
                                        <social.icon size={18} className="relative z-10" />
                                        <ArrowUpRight size={10} className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity z-10" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Control Column */}
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Back To Top</span>
                            <button
                                onClick={scrollToTop}
                                className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-black hover:bg-zinc-900 hover:text-white transition-all duration-500 group border border-zinc-50"
                            >
                                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest ">
                            © 2024 {profileData.fullName}. All rights reserved.
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Currently Available for New Projects</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
