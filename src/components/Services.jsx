import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../constants/portfolioData';

export const Services = () => (
    <section id="services" className="py-8 flex flex-col items-center overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-16"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 mb-4">My Services</h2>
            <div className="bg-zinc-100 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 inline-block">
                Capabilities
            </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {servicesData.map((service, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="bg-[#F8F8F8] rounded-[3rem] p-10 flex items-center gap-8 group cursor-pointer hover:bg-white hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-zinc-100"
                >
                    <div className="w-20 h-20 shrink-0 rounded-[2.2rem] bg-white flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-zinc-50 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-zinc-50">
                        <service.icon size={36} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-2xl tracking-tight text-zinc-900">{service.title}</h3>
                        <p className="text-lg leading-relaxed font-medium text-zinc-500 group-hover:text-zinc-600 transition-colors">{service.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);
