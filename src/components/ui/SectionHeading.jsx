import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({ eyebrow, title, description }) => (
    <div className="w-full mb-12 flex flex-col items-center text-center">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-4"
        >
            <span className="h-px w-8 bg-zinc-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                {eyebrow}
            </span>
            <span className="h-px w-8 bg-zinc-300" />
        </motion.div>

        <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight max-w-3xl"
        >
            {title}
        </motion.h2>

        {description && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-4 text-zinc-500 text-base md:text-lg font-medium leading-relaxed max-w-xl"
            >
                {description}
            </motion.p>
        )}
    </div>
);
