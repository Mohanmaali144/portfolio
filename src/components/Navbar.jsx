import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { profileData } from '../constants/portfolioData';
import { ThemeToggle } from './ui/ThemeToggle';
import { Logo } from './ui/Logo';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
            // Determine active section based on scroll position
            const sections = [
                { id: 'services', name: 'Services' },
                { id: 'work', name: 'Work' },
                { id: 'tech', name: 'Tech Stack' },
                { id: 'contact', name: 'Contact' }
            ];
            
            const scrollPosition = window.scrollY + 100;
            
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.name);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "Tech Stack", href: "#tech" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
            ? "py-4 bg-[#F2F2F2]/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg dark:shadow-black/40 rounded-b-[3rem]"
            : "py-6 bg-transparent"
            }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-row justify-between items-center w-full">
                {/* Logo */}
                <motion.a
                    href="#"
                    aria-label="Mohan Maali — home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="cursor-pointer flex items-center group"
                >
                    <Logo className="h-6 md:h-7 w-auto text-black dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors duration-300" />
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                            className={`text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group ${
                                activeSection === link.name
                                    ? 'text-black dark:text-white'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                                activeSection === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                        </motion.a>
                    ))}
                    <motion.a
                        href={profileData.resume}
                        download="resume.pdf"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-black text-white dark:bg-white dark:text-zinc-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-[0.1em] flex items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Download Resume
                        <Download size={16} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                    </motion.a>
                    <ThemeToggle />
                </div>

                {/* Mobile Controls */}
                <div className="lg:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-11 h-11 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-full shadow-md text-black dark:text-white hover:shadow-lg transition-all duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl rounded-3xl mt-2 border border-zinc-100 dark:border-white/10"
                    >
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`text-lg font-bold uppercase tracking-[0.1em] transition-colors duration-300 py-2 border-b transition-all duration-300 ${
                                    activeSection === link.name
                                        ? 'text-black dark:text-white border-zinc-300 dark:border-white/20'
                                        : 'text-zinc-600 dark:text-zinc-400 border-zinc-100 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-zinc-300'
                                }`}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            href={profileData.resume}
                            download="resume.pdf"
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-black text-white dark:bg-white dark:text-zinc-900 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-[0.1em] flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 shadow-lg"
                        >
                            Download Resume
                            <Download size={16} strokeWidth={2.5} />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
