import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { profileData } from '../constants/portfolioData';
import { WhatsAppButton } from './WhatsAppButton';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitState, setSubmitState] = useState('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const mailtoHref = useMemo(() => {
        const subject = 'New Project Inquiry';
        const body = formData.message?.trim()
            ? `Hello ${profileData.name},\n\nI would like to discuss a project with you.\n\nMessage:\n${formData.message.trim()}\n\n---\nName: ${formData.name?.trim() || ''}\nEmail: ${formData.email?.trim() || ''}`
            : `Hello ${profileData.name},\n\nI would like to discuss a project with you.\n\n---\nName: ${formData.name?.trim() || ''}\nEmail: ${formData.email?.trim() || ''}`;
        return `mailto:${profileData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, [formData.email, formData.message, formData.name]);

    const emailJsConfig = useMemo(
        () => ({
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        }),
        []
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!formData.name.trim()) return 'Please enter your name.';
        if (!formData.email.trim()) return 'Please enter your email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return 'Please enter a valid email.';
        if (!formData.message.trim()) return 'Please write your message.';
        if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
            return 'Email service is not configured. Please try again later.';
        }
        return '';
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            setSubmitState('error');
            setStatusMessage(error);
            return;
        }

        setSubmitState('sending');
        setStatusMessage('');

        const submittedAt = new Date()
            .toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
            .replace(' am', ' AM')
            .replace(' pm', ' PM');

        try {
            await emailjs.send(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                {
                    name: formData.name,
                    from_name: formData.name,
                    time: submittedAt,
                    reply_to: formData.email,
                    message: formData.message,
                    to_email: profileData.email
                },
                { publicKey: emailJsConfig.publicKey }
            );

            setSubmitState('success');
            setStatusMessage('Message sent successfully.');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setSubmitState('error');
            setStatusMessage('Failed to send message. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 px-6 md:px-16 w-full bg-[#F2F2F2] rounded-[3rem] md:rounded-[5rem] transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Content: Text and Info */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-400 self-center lg:self-start border border-white/20 shadow-sm"
                        >
                            Available for Projects
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-[0.95] tracking-tighter"
                        >
                            Let's build your <br />
                            next big idea.
                        </motion.h2>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-sm lg:max-w-none">
                        <a href={mailtoHref} className="group flex items-center gap-5 p-2 pr-6 rounded-2xl hover:bg-white transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500 shadow-sm border border-zinc-50">
                                <Mail size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</span>
                                <span className="text-xl font-bold text-zinc-900 leading-tight">{profileData.email}</span>
                            </div>
                        </a>

                        <div className="flex gap-3 pl-2">
                            {profileData.socialLinks.slice(0, 2).map((social, i) => (
                                <a key={i} href={social.href} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all duration-500 shadow-sm border border-zinc-50">
                                    <social.icon size={20} />
                                </a>
                            ))}
                            <WhatsAppButton />
                        </div>
                    </div>
                </div>

                {/* Right Content: Compact Form Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 bg-white p-8 md:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-zinc-50"
                >
                    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={onChange}
                                    placeholder="Enter your name"
                                    className="bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none font-medium text-zinc-900 placeholder:text-zinc-300"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    placeholder="Enter your email"
                                    className="bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none font-medium text-zinc-900 placeholder:text-zinc-300"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={onChange}
                                placeholder="Write your message"
                                className="bg-zinc-50 border border-zinc-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none font-medium resize-none text-zinc-900 placeholder:text-zinc-300"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitState === 'sending'}
                            className="bg-zinc-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-100 mt-2 hover:bg-zinc-800 disabled:opacity-60 disabled:hover:scale-100"
                        >
                            <Send size={18} />
                            {submitState === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {statusMessage ? (
                            <div className={`text-sm font-medium ${submitState === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {statusMessage}
                            </div>
                        ) : null}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
