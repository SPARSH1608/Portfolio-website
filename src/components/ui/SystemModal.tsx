'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SystemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SystemModal({ isOpen, onClose }: SystemModalProps) {
    const PUNK_MESSAGES = [
        "hire me dude",
        "ik im the best what u gonna do? hire me?",
        "system status: absolutely cranked",
        "checking vibes... 100% chill",
        "no bugs, just chaotic features",
        "running on caffeine and sheer will",
        "optimized for chaos",
        "warning: extreme levels of cool detected"
    ];

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        // Set random punk message on mount
        setMessage(PUNK_MESSAGES[Math.floor(Math.random() * PUNK_MESSAGES.length)]);
    }, [isOpen]); // Re-roll message every time it opens

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm bg-[#1a1b26] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Cpu size={16} className="text-[#10B981]" />
                                <span className="text-sm font-medium text-white">System Message</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            <p className="text-lg text-[#34D399] font-mono tracking-tight animate-pulse font-bold leading-relaxed">
                                "{message}"
                            </p>
                            <p className="text-[10px] text-neutral-600 mt-4">running on sparsh.dev</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
