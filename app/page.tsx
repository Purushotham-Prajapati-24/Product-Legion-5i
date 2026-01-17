"use client";

import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import OverlayContent from "@/components/OverlayContent";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import { DeveloperSection } from "@/components/DeveloperSection";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#E10600] selection:text-white">
      <Navbar />

      {/* 
         Height can be adjusted. 450vh allows for nice pacing. 
      */}
      <div className="h-[450vh]">
        <ScrollytellingCanvas />
        <OverlayContent />
      </div>

      <DeveloperSection scrollYProgress={scrollYProgress} />
    </main>
  );
}
