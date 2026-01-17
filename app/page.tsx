import Navbar from "@/components/Navbar";
import OverlayContent from "@/components/OverlayContent";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";

export default function Home() {
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

    </main>
  );
}
