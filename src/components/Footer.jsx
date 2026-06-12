import React from 'react';
import { Heart, ArrowUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../constants/portfolioData';
import { Logo } from './ui/Logo';

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "Tech Stack", href: "#tech" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="w-full bg-transparent">
            <div className="max-w-full mx-auto px-6 md:px-12 pt-10 pb-10">
                {/* Main Footer Content */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-16 border-b border-zinc-200/60 dark:border-white/10 pb-12">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6 text-left max-w-lg">
                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            className="cursor-pointer flex items-center group w-fit"
                        >
                            <Logo className="h-7 w-auto text-black dark:text-white group-hover:text-zinc-500 transition-colors duration-300" />
                        </button>
                        <p className="text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 leading-[1.2] tracking-tight">
                            Crafting exceptional digital experiences through modern design and clean code.
                        </p>
                    </div>

                    {/* Quick Links & Socials Container */}
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-24">
                        {/* Quick Links Column */}
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Quick Links</span>
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="group text-sm font-bold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 transition-all flex items-center gap-2"
                                    >
                                        {link.name}
                                        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social Icons Column */}
                        <div className="flex flex-col gap-5">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Follow Me</span>
                            <div className="flex items-center gap-3">
                                {profileData.socialLinks.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-500 hover:scale-110 shadow-sm border border-zinc-50 dark:border-white/10 relative overflow-hidden"
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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Back To Top</span>
                            <button
                                onClick={scrollToTop}
                                className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-black dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-500 group border border-zinc-50 dark:border-white/10"
                            >
                                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ">
                            © {new Date().getFullYear()} {profileData.fullName}. All rights reserved.
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 rounded-full border border-zinc-200/20 dark:border-white/10">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Currently Available for New Projects</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
