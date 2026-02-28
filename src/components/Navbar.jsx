import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { profileData } from '../constants/portfolioData';

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
                { id: 'about', name: 'About' },
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
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
            ? "py-4 bg-[#F2F2F2]/90 backdrop-blur-md shadow-lg rounded-b-[3rem]"
            : "py-6 bg-transparent"
            }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-row justify-between items-center w-full">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-4xl font-black tracking-tighter cursor-pointer flex items-center group"
                >
                    <span className="text-black group-hover:text-zinc-600 transition-colors duration-300">MD.</span>
                    <div className="w-2 h-2 bg-black rounded-full ml-2 self-end mb-2 group-hover:bg-zinc-600 transition-colors duration-300"></div>
                </motion.div>

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
                                    ? 'text-black' 
                                    : 'text-zinc-500 hover:text-black'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
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
                        className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-[0.1em] flex items-center gap-2 hover:bg-zinc-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Download Resume
                        <Download size={16} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="lg:hidden w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-md text-black hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-4 right-4 bg-white/95 backdrop-blur-md p-6 flex flex-col gap-4 shadow-2xl rounded-3xl mt-2 border border-zinc-100"
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
                                        ? 'text-black border-zinc-300'
                                        : 'text-zinc-600 border-zinc-100 hover:text-black hover:border-zinc-300'
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
                            className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-[0.1em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all duration-300 shadow-lg"
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
