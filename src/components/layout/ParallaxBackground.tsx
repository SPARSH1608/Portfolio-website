'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxBackground() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const middleY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (

        <div ref={ref} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-neutral-950">
            {/* Deep Space / Dark Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-900" />

            {/* Subtle Aurora or Glows */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0"
            >
                <div className="absolute top-[0%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#052659]/30 rounded-full blur-[100px]" />
            </motion.div>

            {/* Precise Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>
    );
}
