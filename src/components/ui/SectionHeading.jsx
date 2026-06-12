import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({ eyebrow, title, description }) => (
    <div className="w-full mb-14 flex flex-col items-center text-center">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-5 rounded-full surface px-4 py-1.5"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                {eyebrow}
            </span>
        </motion.div>

        <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent"
        >
            {title}
        </motion.h2>

        {description && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-5 text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-medium leading-relaxed max-w-xl"
            >
                {description}
            </motion.p>
        )}
    </div>
);
