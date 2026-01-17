"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent py-6"}`}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Left */}
                <div className="text-xl font-bold tracking-tighter text-white uppercase group cursor-pointer">
                    Legion <span className="text-[#E10600] group-hover:shadow-[0_0_20px_#E10600] transition-shadow duration-300">5i</span>
                </div>

                {/* Center */}
                <div className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest text-white/50 uppercase">
                    <button className="hover:text-white transition-colors duration-300">Overview</button>
                    <button className="hover:text-[#E10600] transition-colors duration-300">Performance</button>
                    <button className="hover:text-[#00E5FF] transition-colors duration-300">Graphics</button>
                    <button className="hover:text-white transition-colors duration-300">Display</button>
                    <button className="hover:text-white transition-colors duration-300">Specs</button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <button className="text-xs font-bold uppercase tracking-widest text-[#E10600] hover:text-white transition-colors">
                        Buy Now
                    </button>
                </div>
            </div>
        </nav>
    );
}
