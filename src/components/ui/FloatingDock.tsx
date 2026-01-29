'use client';

import { motion } from 'framer-motion';
import { Home, Terminal, Folder, User, Mail, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function FloatingDock() {
    const dockItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Folder, label: 'Projects', href: '#projects' },
        { icon: Terminal, label: 'Stack', href: '#stack' },
        { icon: User, label: 'About', href: '#about' },
        { icon: Mail, label: 'Contact', href: 'mailto:contact@example.com' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/50"
            >
                {dockItems.map((item) => (
                    <DockItem key={item.label} {...item} />
                ))}

                <div className="w-px h-8 bg-white/10 mx-2" />

                <DockItem icon={Github} label="GitHub" href="https://github.com" external />
                <DockItem icon={Twitter} label="Twitter" href="https://twitter.com" external />
            </motion.div>
        </div>
    );
}

function DockItem({ icon: Icon, label, href, external }: any) {
    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            className="relative group p-3 rounded-xl hover:bg-white/10 transition-colors"
        >
            <Icon size={20} className="text-neutral-400 group-hover:text-white transition-colors" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md pointer-events-none">
                {label}
            </span>
        </Link>
    );
}
