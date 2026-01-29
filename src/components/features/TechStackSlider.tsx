'use client';

import { motion } from 'framer-motion';

const TECHNOLOGIES = [
    "Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Framer Motion", "Prisma", "PostgreSQL", "Bun", "Vercel", "Neon DB", "Three.js"
];

export default function TechStackSlider() {
    return (
        <div className="w-full overflow-hidden mask-image-linear-to-r from-transparent via-black to-transparent flex">
            {/* Seamless Double Loop */}
            <motion.div
                className="flex gap-12 py-4 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 group cursor-default">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-emerald-500 transition-colors" />
                        <span className="text-neutral-400 font-mono text-sm uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                            {tech}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
