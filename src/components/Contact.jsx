import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, Loader2, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profileData, contactHelpOptions } from '../constants/portfolioData';
import { WhatsAppButton } from './WhatsAppButton';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '',
        phone: '',
        message: '',
    });
    const [submitState, setSubmitState] = useState('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const emailJsConfig = useMemo(
        () => ({
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }),
        []
    );

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) return fail('Please enter your name.');
        if (!EMAIL_RE.test(formData.email.trim())) return fail('Please enter a valid email.');
        if (!formData.message.trim()) return fail('Please write your message.');
        if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
            return fail('Email service is not configured. Please set VITE_EMAILJS_* in .env');
        }

        setSubmitState('sending');
        setStatusMessage('');

        try {
            await emailjs.send(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                {
                    from_name: formData.name,
                    reply_to: formData.email,
                    email: formData.email,
                    topic: formData.topic || 'No topic',
                    phone: formData.phone || '—',
                    message: formData.message,
                    to_email: profileData.email,
                    time: new Date().toLocaleString(),
                },
                { publicKey: emailJsConfig.publicKey }
            );
            setSubmitState('success');
            setStatusMessage("Thanks — I'll get back to you within 24 hours.");
            setFormData({ name: '', email: '', topic: '', phone: '', message: '' });
        } catch (err) {
            setSubmitState('error');
            setStatusMessage(err?.text || 'Failed to send message. Please try again.');
        }
    };

    function fail(msg) {
        setSubmitState('error');
        setStatusMessage(msg);
    }

    return (
        <section
            id="contact"
            className="py-12 md:py-16 px-4 md:px-10 bg-[#F4F4F4] rounded-[2.5rem] md:rounded-[4rem]"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* LEFT: Heading + separate info cards */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                    {/* Heading (no card) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-start gap-4 px-2 md:px-3 mb-3 mt-2"
                    >
                        <span className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 border border-zinc-200 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Available for Projects
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                            Let's Work Together.
                        </h2>
                        <p className="text-base text-zinc-600 font-medium leading-relaxed max-w-md">
                            Have a project in mind, a question, or just want to say hi? Drop a message — I read every email and reply within a day.
                        </p>
                    </motion.div>

                    {/* Each info item gets its own card */}
                    <InfoCard
                        icon={Mail}
                        label="Email"
                        value={profileData.email}
                        href={`mailto:${profileData.email}`}
                        delay={0.05}
                    />
                    <InfoCard
                        icon={MapPin}
                        label="Location"
                        value={`${profileData.location} · Remote`}
                        delay={0.1}
                    />
                    <InfoCard
                        icon={Clock}
                        label="Response Time"
                        value="Within 24 hours"
                        delay={0.15}
                    />

                    {/* Socials - no card bg, just heading + icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="px-2 mt-1"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 block mb-3">
                            Find me on
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {profileData.socialLinks.map((social) => {
                                const SocialIcon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="w-10 h-10 rounded-lg bg-[#F8F8F8] border border-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                                    >
                                        <SocialIcon size={18} />
                                    </a>
                                );
                            })}
                            <WhatsAppButton />
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Form card */}
                <motion.form
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="lg:col-span-6 bg-white rounded-[2rem] p-4 md:p-7 border border-zinc-100 shadow-sm flex flex-col gap-4"
                >
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Your Name" required>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={onChange}
                                placeholder={profileData.fullName}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Email Address" required>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder={profileData.email}
                                className={inputCls}
                            />
                        </Field>
                    </div>

                    {/* Row 2: Topic (full width) */}
                    <Field label="What can I help with?">
                        <div className="relative">
                            <select
                                name="topic"
                                value={formData.topic}
                                onChange={onChange}
                                className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                            >
                                <option value="">Pick a topic…</option>
                                {contactHelpOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">
                                ▾
                            </span>
                        </div>
                    </Field>

                    {/* Row 3: Phone (full width) */}
                    <Field label="Phone Number (optional)">
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={onChange}
                            placeholder="+91 ..."
                            className={inputCls}
                        />
                    </Field>

                    {/* Row 4: Message (full width) */}
                    <Field label="Your Message" required>
                        <textarea
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={onChange}
                            placeholder="Tell me a bit about your project, timeline, and what you're hoping to achieve."
                            className={`${inputCls} resize-none`}
                        />
                    </Field>

                    <button
                        type="submit"
                        disabled={submitState === 'sending'}
                        className="mt-2 inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-60 disabled:hover:bg-zinc-900 text-white py-4 rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                        {submitState === 'sending' ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Sending…
                            </>
                        ) : (
                            <>
                                <Send size={16} /> Send Message
                            </>
                        )}
                    </button>

                    {statusMessage && (
                        <div
                            className={`flex items-start gap-2 text-sm font-medium ${
                                submitState === 'success' ? 'text-emerald-700' : 'text-red-600'
                            }`}
                        >
                            {submitState === 'success' ? (
                                <Check size={16} className="mt-0.5 shrink-0" />
                            ) : (
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                            )}
                            <span>{statusMessage}</span>
                        </div>
                    )}
                </motion.form>
            </div>
        </section>
    );
};

const inputCls =
    'w-full bg-[#F8F8F8] border border-zinc-100 px-5 py-3.5 rounded-xl focus:bg-white focus:border-zinc-300 focus:ring-2 focus:ring-zinc-200 transition-all outline-none font-medium text-sm text-zinc-900 placeholder:text-zinc-400';

const Field = ({ label, required, children }) => (
    <label className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 ml-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {children}
    </label>
);

const InfoCard = ({ icon: Icon, label, value, href, delay = 0 }) => {
    const content = (
        <>
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#F8F8F8] flex items-center justify-center text-zinc-700 border border-zinc-100">
                <Icon size={18} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-1">
                    {label}
                </span>
                <span className="text-sm font-semibold text-zinc-900 truncate">{value}</span>
            </div>
        </>
    );

    const cardCls =
        'bg-white rounded-[1.25rem] px-4 py-3 border border-zinc-100 shadow-sm flex items-center gap-3 transition-all duration-300';

    const animation = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay },
    };

    return href ? (
        <motion.a href={href} {...animation} className={`${cardCls} hover:border-zinc-300 hover:bg-[#FAFAFA] cursor-pointer`}>
            {content}
        </motion.a>
    ) : (
        <motion.div {...animation} className={cardCls}>
            {content}
        </motion.div>
    );
};
