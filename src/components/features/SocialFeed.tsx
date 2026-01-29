'use client';

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Mock data type
type SocialPost = {
    id: string;
    platform: string;
    content?: string | null;
    url: string;
    date: Date;
};

export default function SocialFeed({
    posts = [],
    className
}: {
    posts?: SocialPost[],
    className?: string
}) {
    return (
        <div className="flex flex-col gap-4 h-full">
            <h3 className="text-xl font-bold font-heading text-white hidden">Latest Updates</h3>
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 h-full scrollbar-none">
                {posts.length === 0 && (
                    <p className="text-neutral-500 text-sm italic">No recent updates.</p>
                )}
                {posts.map((post) => (
                    <a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-neutral-300 border border-white/5 group-hover:border-white/20 transition-colors",
                                post.platform === 'twitter' && "group-hover:text-blue-400",
                                post.platform === 'medium' && "group-hover:text-amber-400"
                            )}>
                                {post.platform}
                            </span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-neutral-300 group-hover:text-white line-clamp-3 leading-relaxed">
                            {post.content || "Click to view content"}
                        </p>
                        <span className="text-[10px] text-neutral-500 mt-3 block font-mono">
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
