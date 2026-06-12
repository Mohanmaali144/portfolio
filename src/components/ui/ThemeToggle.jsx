import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

// Reads the theme already applied by the inline <head> script, lets the user
// flip it, and persists the choice. Falls back to the OS preference until the
// visitor makes an explicit choice.
const getInitialTheme = () => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

export const ThemeToggle = ({ className = '' }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem('theme', theme);
        } catch { /* storage unavailable */ }
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <motion.button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-white/10 shadow-soft hover:shadow-card cursor-pointer transition-all duration-300 overflow-hidden ${className}`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="moon"
                        initial={{ y: 14, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -14, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.25 }}
                        className="flex"
                    >
                        <Moon size={18} strokeWidth={2} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ y: 14, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -14, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.25 }}
                        className="flex"
                    >
                        <Sun size={18} strokeWidth={2} />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
