'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Box } from 'lucide-react';

const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 400,
        y: (Math.random() - 0.5) * 60,
        size: Math.random() * 10 + 2,
        duration: Math.random() * 1 + 2,
        delay: Math.random() * 2,
    }));
};

interface HeroPortalProps {
    onEnter?: () => void;
}

import { incrementVisitorCount } from '@/app/actions';


export default function HeroPortal({ onEnter }: HeroPortalProps) {
    const [particles, setParticles] = useState<any[]>([]);
    const [visitorCount, setVisitorCount] = useState<number | null>(null);

    useEffect(() => {
        setParticles(generateParticles(50));

        incrementVisitorCount().then(count => {
            setVisitorCount(count);
        });
    }, []);

    return (
        <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#050505] perspective-1000">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] z-0 pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl flex items-center justify-center h-96">
                <div className="absolute right-[50%] top-1/2 -translate-y-1/2 w-[500px] h-[300px] origin-right pointer-events-none overflow-hidden mix-blend-screen">
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-l from-emerald-500/50 to-transparent blur-sm"
                        style={{ transformOrigin: 'right center' }}
                    />
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [-15, -12, -15] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-1/2 w-[120%] h-20 bg-gradient-to-l from-emerald-500/20 to-transparent blur-md"
                        style={{ transformOrigin: 'right center' }}
                    />
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2], rotate: [15, 12, 15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-0 top-1/2 w-[120%] h-20 bg-gradient-to-l from-emerald-500/20 to-transparent blur-md -mt-20"
                        style={{ transformOrigin: 'right center' }}
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/30 blur-[60px] rounded-full" />
                </div>

                <div className="relative z-20 shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.2)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
                        <Box className="text-emerald-400 w-10 h-10 md:w-12 md:h-12 relative z-10" strokeWidth={1.5} />
                        <motion.div
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl border border-emerald-500/50"
                        />
                    </div>
                </div>

                <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-[500px] h-[200px] pl-10 overflow-hidden pointer-events-none mask-image-linear-to-l">
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10" />
                    {particles.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 400, opacity: 0, scale: 0 }}
                            animate={{
                                x: [400, 400 - p.x],
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                                ease: "linear"
                            }}
                            className="absolute top-1/2 left-0 bg-emerald-400/80 rounded-[1px] shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                            style={{
                                width: p.size,
                                height: p.size,
                                y: p.y,
                                boxShadow: `0 0 ${p.size * 2}px rgba(16, 185, 129, 0.4)`
                            }}
                        />
                    ))}
                    <motion.div
                        animate={{ x: [400, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-0 w-20 h-[1px] bg-gradient-to-l from-transparent via-emerald-200 to-transparent blur-[1px]"
                    />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10 text-center mt-12"
            >
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">Sparsh Goel</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-bold tracking-widest uppercase">Software Engineer</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-heading drop-shadow-2xl">
                    Engineering <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">& Design.</span>
                </h1>

                <p className="text-neutral-400 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-10">
                    "It works on my machine" <span className="text-emerald-500/50">✓</span> Verified.<br />
                    Building things that break the internet (in a good way).
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
                    <button onClick={onEnter} className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2">
                        View Projects
                    </button>
                </div>

                {visitorCount !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/20 text-xs font-mono tracking-widest uppercase"
                    >
                        Visitor #{visitorCount.toLocaleString()}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
