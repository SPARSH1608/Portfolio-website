'use client';

import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Twitter, BookOpen, ArrowRight } from 'lucide-react';

interface SocialStackProps {
    posts: any[];
    tweetNodes?: Record<string, React.ReactNode>;
}

export default function SocialStack({ posts, tweetNodes = {} }: SocialStackProps) {
    const skeletonPosts = Array.from({ length: 8 }).map((_, i) => ({
        id: `skeleton-${i}`,
        platform: i % 2 === 0 ? 'twitter' : 'medium',
        date: new Date().toISOString(),
        content: "Loading incoming transmission...",
        isSkeleton: true,
        url: "#"
    }));

    const safePosts = posts.length > 0 ? posts : skeletonPosts;

    const getSpanClass = (index: number) => {
        const pattern = [
            'md:col-span-1 md:row-span-1',
            'md:col-span-2 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-2',
            'md:col-span-1 md:row-span-1',
            'md:col-span-2 md:row-span-1',
        ];
        return pattern[index % pattern.length];
    };

    const getGradient = (index: number) => {
        const gradients = [
            'from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20',
            'from-[#10B981]/10 to-[#34D399]/10 hover:from-[#10B981]/20 hover:to-[#34D399]/20',
            'from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20',
            'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20',
            'from-sky-500/10 to-cyan-500/10 hover:from-sky-500/20 hover:to-cyan-500/20',
            'from-indigo-500/10 to-violet-500/10 hover:from-indigo-500/20 hover:to-violet-500/20',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <section className="py-24 w-full min-h-screen flex flex-col items-center justify-start relative overflow-y-auto bg-[#050505]">

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] z-0 pointer-events-none" />



            <div className="text-center mb-16 relative z-10 mt-10">
                <h3 className="text-3xl md:text-5xl font-bold mb-3 font-heading text-white tracking-tight">Transmission</h3>
                <p className="text-neutral-500 font-light">Intercepted Signals</p>
            </div>

            <div className="relative w-full max-w-6xl px-4 z-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
                    {safePosts.map((post, i) => (
                        <a
                            key={`${post.id}-${i}`}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 hover:border-white/20 transition-all hover:shadow-2xl hover:scale-[1.02] duration-300 ${getSpanClass(i)}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br opacity-100 transition-colors duration-500 ${getGradient(i)}`} />

                            <div className="absolute inset-0 p-6 flex flex-col justify-between">

                                <div className="flex justify-between items-start">
                                    <span className="p-3 rounded-full backdrop-blur-md bg-white/5 text-white/80">
                                        {post.platform === 'twitter' ? <Twitter size={20} /> : <BookOpen size={20} />}
                                    </span>
                                    <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="text-white" size={20} />
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">

                                    <div className="transform transition-all duration-300 group-hover:-translate-y-2 opacity-100 group-hover:opacity-0 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                    </div>


                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-lg text-white font-medium leading-snug line-clamp-3">
                                            {post.description || post.content || "View Signal Data"}
                                        </p>
                                        <div className="h-1 w-10 mt-4 rounded-full bg-white/10 group-hover:bg-[#10B981] transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center text-neutral-500 italic mt-20">No signal detected...</div>
                )}
            </div>
        </section>
    );
}
