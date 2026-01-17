"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { ReactNode } from "react";

// Helper for fading and sliding animations
function CinematicSection({
    start,
    end,
    children,
    align = "center",
    width = "max-w-4xl",
    persist = false
}: {
    start: number;
    end: number;
    children: ReactNode;
    align?: "left" | "center" | "right";
    width?: string;
    persist?: boolean;
}) {
    const { scrollYProgress } = useScroll();

    // Calculate safe fade duration to avoid overlap
    // Use 15% of the section length for fade, capped at 0.05
    const duration = end - start;
    const fadeOffset = Math.min(0.05, duration * 0.15);

    // Smoother fade in/out with calculated offsets
    const opacity = useTransform(
        scrollYProgress,
        // If persist is true, we map the end state to opacity 1
        [start, start + fadeOffset, end - fadeOffset, end],
        persist ? [0, 1, 1, 1] : [0, 1, 1, 0]
    );

    // ParallaxY for that "floating" feel
    // If persisting, don't move out at the end, just settle
    const y = useTransform(
        scrollYProgress,
        [start, end],
        persist ? [40, 0] : [40, -40]
    );

    const pointerEvents = useTransform(opacity, (val) => val > 0.5 ? "auto" : "none");

    const alignClasses = {
        left: "items-start text-left pl-12 md:pl-32",
        center: "items-center text-center",
        right: "items-end text-right pr-12 md:pr-32"
    }[align];

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className={`fixed inset-0 z-10 flex flex-col justify-center ${alignClasses} pointer-events-none`}
        >
            <div className={`${width}`}>
                {children}
            </div>
        </motion.div>
    );
}

// Separator line component
const Divider = () => <div className="h-[1px] w-12 bg-white/20 mb-6 mt-2" />;

export default function OverlayContent() {
    return (
        <>
            {/* 0-15% INTRO / AUTHORITY */}
            <CinematicSection start={0} end={0.15} align="center">
                <motion.div
                    initial={{ letterSpacing: "0.5em" }}
                    whileInView={{ letterSpacing: "0.2em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#E10600] uppercase mb-4"
                >
                    The New Standard
                </motion.div>
                <h1 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tight mb-6 leading-none">
                    Legion 5i
                </h1>
                <p className="text-xl text-white/60 font-light tracking-wide">
                    Built to <span className="text-white font-medium">Dominate</span>.
                </p>
            </CinematicSection>

            {/* 15-30% PERFORMANCE */}
            <CinematicSection start={0.15} end={0.30} align="left">
                <div className="border-l-2 border-[#E10600] pl-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase leading-tight">
                        Extreme <br /> Processing <span className="text-[#E10600]">Power</span>
                    </h2>
                    <Divider />
                    <div className="space-y-4 text-white/80 font-mono text-sm md:text-base">
                        <div>
                            <strong className="text-white block text-lg">Intel® Core™ Ultra 9 275HX</strong>
                            <span className="text-white/50">Hybrid Architecture</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-2xl font-bold text-white">5.40 GHz</div>
                                <div className="text-xs uppercase tracking-wider text-white/40">P-Cores</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">4.60 GHz</div>
                                <div className="text-xs uppercase tracking-wider text-white/40">E-Cores</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CinematicSection>

            {/* 30-45% GRAPHICS */}
            <CinematicSection start={0.30} end={0.45} align="right">
                <div className="border-r-2 border-[#00E5FF] pr-6 flex flex-col items-end">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase leading-tight text-right">
                        Next-Gen <br /> Graphics
                    </h2>
                    <div className="h-[1px] w-12 bg-[#00E5FF]/50 mb-6 mt-2" />
                    <div className="space-y-4 text-white/80 font-mono text-sm md:text-base text-right">
                        <div>
                            <strong className="text-white block text-lg">NVIDIA® GeForce RTX™ 5070</strong>
                            <span className="text-[#00E5FF]">Laptop GPU</span>
                        </div>
                        <div className="flex gap-8 justify-end">
                            <div>
                                <div className="text-2xl font-bold text-white">8GB</div>
                                <div className="text-xs uppercase tracking-wider text-white/40">GDDR7</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">DLSS</div>
                                <div className="text-xs uppercase tracking-wider text-white/40">AI Powered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CinematicSection>

            {/* 45-60% MEMORY */}
            <CinematicSection start={0.45} end={0.60} align="left">
                <h2 className="text-6xl md:text-9xl font-black text-white/5 absolute -z-10 -left-20 select-none">SPEED</h2>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase">
                    Zero Compromise
                </h2>
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-6">
                        <div className="text-5xl font-bold text-[#E10600]">32<span className="text-2xl align-top">GB</span></div>
                        <div>
                            <div className="uppercase tracking-widest text-sm text-white/60">DDR5 Memory</div>
                            <div className="text-white text-xl">5600 MT/s</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-5xl font-bold text-white">1<span className="text-2xl align-top">TB</span></div>
                        <div>
                            <div className="uppercase tracking-widest text-sm text-white/60">PCIe Gen 4</div>
                            <div className="text-white text-xl">Instant Response</div>
                        </div>
                    </div>
                </div>
            </CinematicSection>

            {/* 60-80% DISPLAY */}
            <CinematicSection start={0.60} end={0.80} align="center">
                <div className="bg-[#050505]/80 backdrop-blur-xl p-8 md:p-12 border border-white/5 rounded-sm">
                    <p className="uppercase tracking-[0.3em] text-[#00E5FF] text-xs mb-4">Visual Precision</p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase">
                        Precision You Can See
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                        <div>
                            <div className="text-3xl font-bold text-white">16"</div>
                            <div className="text-xs text-white/40 uppercase mt-1">OLED WQXGA</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">165<span className="text-lg">Hz</span></div>
                            <div className="text-xs text-white/40 uppercase mt-1">Refresh Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">100<span className="text-lg">%</span></div>
                            <div className="text-xs text-white/40 uppercase mt-1">DCI-P3 Color</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">HDR</div>
                            <div className="text-xs text-white/40 uppercase mt-1">True Black</div>
                        </div>
                    </div>
                </div>
            </CinematicSection>

            {/* 80-95% CONFIDENCE */}
            <CinematicSection start={0.80} end={0.95} align="center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-light text-white uppercase tracking-tight">
                        Engineered for <strong className="font-bold text-[#E10600]">Victory</strong>
                    </h2>
                </motion.div>
            </CinematicSection>

            {/* 95-100% CTA */}
            <CinematicSection start={0.95} end={1.0} align="center" persist>
                <div className="flex flex-col items-center gap-6">
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                        Legion 5i
                    </h2>
                    <p className="text-xl text-white/60 tracking-widest uppercase mb-8">Performance Without Limits</p>

                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#E10600] hover:text-white transition-colors duration-300">
                            Buy Now
                        </button>
                        <button className="border border-white/20 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors duration-300">
                            View Full Specs
                        </button>
                    </div>
                </div>
            </CinematicSection>
        </>
    );
}
