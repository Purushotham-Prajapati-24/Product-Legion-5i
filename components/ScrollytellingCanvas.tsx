"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;
const IMAGES_DIR = "/images/sequence/";

export default function ScrollytellingCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    const { scrollYProgress } = useScroll();

    // NOTE: In the cinematic version, we might want to "dwell" on certain frames 
    // or scrub through them differently to match the beats.
    // For now, linear mapping is safest to keep sync with text simple.
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            // Preload images
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameNumber = i.toString().padStart(3, "0");
                    img.src = `${IMAGES_DIR}ezgif-frame-${frameNumber}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        setLoadedCount((prev) => prev + 1);
                        resolve();
                    };
                    img.onerror = () => resolve();
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const imageIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(index) - 1));
        const img = images[imageIndex];

        if (!img) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Cinematic Mood: Ensure clear background
        context.fillStyle = "#050505";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Scale to COVER or CONTAIN? 
        // "Studio environment", "Minimal". 
        // Contain usually looks better for product showcases so edges aren't cut off unexpectedly.
        // However, user mentioned "Macro shots" - since we are reusing the full laptop images, 
        // we can simulate macro by SCALING UP at certain drill points?
        // That would be complex to sync without separate assets. 
        // Let's stick to standard `contain` but maybe with a slightly larger base scale.

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        context.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Optional: Add a subtle vignette in canvas for that "Studio" feel?
        // Or do it in CSS overlay. Canvas is cleaner for performance.
        const gradient = context.createRadialGradient(
            canvas.width / 2, canvas.height / 2, img.width * scale * 0.2, // Inner circle
            canvas.width / 2, canvas.height / 2, canvas.width * 0.8  // Outer circle
        );
        gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
        gradient.addColorStop(1, "rgba(5, 5, 5, 0.4)"); // Darken edges

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    useEffect(() => {
        if (images.length > 0) {
            renderFrame(frameIndex.get());
        }
        const handleResize = () => renderFrame(frameIndex.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images, frameIndex]);

    return (
        <div className="fixed inset-0 z-0 h-screen w-full bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="block h-full w-full object-contain"
            />
            {loadedCount < FRAME_COUNT && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#050505] text-white z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-2xl font-black tracking-[0.2em] uppercase text-white/20 animate-pulse">
                            Legion
                        </div>
                        <div className="h-0.5 w-32 bg-[#0B0B0E] overflow-hidden rounded-full">
                            <div
                                className="h-full bg-[#E10600] transition-all duration-300 ease-out"
                                style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
