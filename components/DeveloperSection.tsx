"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { Instagram, Twitter, Linkedin, Mail, Github } from "lucide-react";
import Ballpit from "./Ballpit";

interface SectionProps {
    scrollYProgress: MotionValue<number>;
}

export const DeveloperSection = ({ scrollYProgress }: SectionProps) => {
    // Reveal in the last 10-15% of scroll
    const y = useTransform(scrollYProgress, [0.85, 1], ["100%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
    // Add a slight scale effect for dynamic feel
    const scale = useTransform(scrollYProgress, [0.85, 1], [0.9, 1]);



    const socialLinks = [
        {
            name: "Instagram",
            href: "https://www.instagram.com/uttam__purush_/",
            icon: <Instagram className="w-6 h-6" />,
            color: "hover:text-[#E1306C]"
        },
        {
            name: "GitHub",
            href: "https://github.com/Purushotham-Prajapati-24",
            icon: <Github className="w-6 h-6" />,
            color: "hover:text-white"
        },
        {
            name: "X (Twitter)",
            href: "https://x.com/uttam_purush_18",
            icon: <Twitter className="w-6 h-6" />,
            color: "hover:text-[#1DA1F2]"
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/purushotham-prajapati-4785b031b/",
            icon: <Linkedin className="w-6 h-6" />,
            color: "hover:text-[#0A66C2]"
        },
        {
            name: "Mail",
            href: "mailto:purushothothamprajapati7473@gmail.com",
            icon: <Mail className="w-6 h-6" />,
            color: "hover:text-secondary"
        },
    ];

    return (
        <motion.div
            style={{ y, opacity, scale }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden"
        >
            {/* Background Ballpit */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Ballpit count={80}
                    gravity={0.1}
                    friction={0.99975}
                    wallBounce={2}
                    followCursor={true} />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

            <div className="relative z-20 text-center space-y-12 max-w-4xl px-6 bg-black/20 backdrop-blur-sm p-12 rounded-3xl border border-white/5 shadow-2xl">

                {/* Header / Brand */}
                <div className="space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-secondary tracking-widest text-sm font-medium uppercase"
                    >
                        Creative Director & Developer
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
                    >
                        Uttam <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Purush</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto"
                />

                {/* Bio / Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
                >
                    Crafting ultra-premium digital experiences that blend <span className="text-white">cinematic storytelling</span> with <span className="text-white">interactive engineering</span>.
                </motion.p>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-8"
                >
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300 ${link.color} group relative`}
                            aria-label={link.name}
                        >
                            {link.icon}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {link.name}
                            </span>
                        </a>
                    ))}
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center pt-12"
                >
                    <p className="text-white/20 text-sm">
                        © 2026 Uttam Purush. All Rights Reserved.
                    </p>
                </motion.div>

            </div >
        </motion.div >
    );
};
