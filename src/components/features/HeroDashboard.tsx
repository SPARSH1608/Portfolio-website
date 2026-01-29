'use client';

import { motion } from 'framer-motion';
import { Project, SocialPost } from '@prisma/client';
import { Twitter, BookOpen, ArrowRight, Play, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TechStackSlider from './TechStackSlider';
import GithubHeatmap from './GithubHeatmap';

interface HeroDashboardProps {
    projects: Project[];
    socialPosts?: SocialPost[];
    githubData?: {
        user: any;
        repos: any[];
        commits: any[];
    };
    onShowProjects?: () => void;
    onShowSocial?: () => void;
}

export default function HeroDashboard({ projects, socialPosts = [], githubData, onShowProjects, onShowSocial }: HeroDashboardProps) {
    const featuredProject = projects.find(p => p.isFeatured) || projects[0];
    const otherProjects = projects.filter(p => p.id !== featuredProject?.id).slice(0, 4);

    return (
        <section className="min-h-screen w-full bg-black text-white p-4 md:p-8 flex flex-col font-sans selection:bg-emerald-500/30">


            <header className="flex flex-col md:flex-row items-center gap-6 mb-4 bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-2xl">
                <div className="flex items-center gap-4 shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="px-4 py-1 bg-black/40 rounded-full border border-white/5 text-xs text-neutral-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        sparsh.dev
                    </div>
                </div>

                <div className="grow overflow-hidden px-4 md:px-12 border-x border-white/5 mx-4 hidden md:block">

                    <TechStackSlider />
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><LayoutGrid size={18} /></button>
                </div>
            </header>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 grow">


                <div className="lg:col-span-4 flex flex-col gap-4">

                    <div className="grow bg-neutral-900/40 border border-white/10 rounded-3xl p-4 relative overflow-hidden group hover:border-sky-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-4 shrink-0">
                            <span className="flex items-center gap-2 text-sky-400 font-bold text-sm bg-sky-500/10 px-3 py-1 rounded-full">
                                <Twitter size={14} /> Updates
                            </span>
                            <ArrowRight className="text-neutral-600 group-hover:text-white transition-colors" size={16} />
                        </div>
                        <div className="space-y-4">
                            {(socialPosts?.filter(p => p.platform === 'twitter').slice(0, 3) || []).map((post) => (
                                <a href={post.url} target="_blank" rel="noopener noreferrer" key={post.id} className="block group/item">
                                    <div className="text-sm text-neutral-300 font-light border-l-2 border-white/10 pl-3 group-hover/item:text-white group-hover/item:border-sky-500 transition-colors">
                                        {post.content || "View Tweet"}
                                    </div>
                                </a>
                            ))}
                            <button onClick={onShowSocial} className="mt-2 text-xs text-sky-400 font-medium flex items-center gap-1 group-hover:underline w-full text-left">
                                See all updates <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="grow bg-neutral-900/40 border border-white/10 rounded-3xl p-4 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                        <div className="flex justify-between items-center mb-4 shrink-0">
                            <span className="flex items-center gap-2 text-yellow-400 font-bold text-sm bg-yellow-500/10 px-3 py-1 rounded-full">
                                <BookOpen size={14} /> Articles
                            </span>
                            <ArrowRight className="text-neutral-600 group-hover:text-white transition-colors" size={16} />
                        </div>
                        <div className="space-y-4">
                            {(socialPosts?.filter(p => p.platform === 'medium').slice(0, 3) || []).map((post) => (
                                <a href={post.url} target="_blank" rel="noopener noreferrer" key={post.id} className="block group/item">
                                    <div className="text-sm text-neutral-300 font-light line-clamp-2 group-hover/item:text-white transition-colors">
                                        <span className="text-neutral-500 text-xs block mb-1 group-hover/item:text-neutral-400">{new Date(post.date).toLocaleDateString()}</span>
                                        {post.content || "Read Article on Medium"}
                                    </div>
                                </a>
                            ))}
                            <button onClick={onShowSocial} className="mt-2 text-xs text-yellow-400 font-medium flex items-center gap-1 group-hover:underline w-full text-left">
                                Read more articles <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="bg-neutral-900/40 border border-white/10 rounded-3xl p-4 h-full flex flex-col relative overflow-hidden group">

                        <div className="flex items-center gap-5 mb-5 relative z-10">
                            <div className="w-16 h-16 rounded-full border-2 border-white/10 overflow-hidden bg-neutral-800 shadow-xl">
                                {githubData?.user?.avatar_url && (
                                    <Image src={githubData.user.avatar_url} alt="Profile" width={64} height={64} />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-white mb-0.5">{githubData?.user?.name || "Sparsh"}</h3>
                                <p className="text-xs text-neutral-400 font-mono">@{githubData?.user?.login || "sparsh.dev"}</p>
                                <div className="flex gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                        <span className="font-bold text-white">{githubData?.user?.public_repos || 0}</span> Repos
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                        <span className="font-bold text-white">{githubData?.user?.followers || 0}</span> Followers
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 mb-5 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">Recent Commits</h4>
                                <div className="space-y-3">
                                    {githubData?.commits?.map((commit, i) => (
                                        <div key={i} className="flex gap-2.5 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" />
                                            <div className="overflow-hidden">
                                                <p className="text-xs text-neutral-200 truncate font-mono group-hover:text-emerald-400 transition-colors">{commit.message}</p>
                                                <p className="text-[10px] text-neutral-600 truncate">{commit.repo} • {new Date(commit.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!githubData?.commits || githubData.commits.length === 0) && (
                                        <p className="text-xs text-neutral-600 italic">No recent activity found via API.</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">Active Repositories</h4>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {githubData?.repos?.slice(0, 3).map((repo) => (
                                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group hover:border-emerald-500/20">
                                            <div>
                                                <p className="text-xs font-bold text-neutral-200 group-hover:text-white mb-0.5">{repo.name}</p>
                                                <p className="text-[10px] text-neutral-500 line-clamp-1">{repo.description}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                                <span className="text-[10px] text-neutral-400">{repo.language || 'Code'}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="border-t border-white/5 pt-4">
                            <div className="flex justify-between items-end mb-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500">Contribution Map</h4>
                                <span className="text-[10px] text-neutral-500">Last 24 Weeks</span>
                            </div>
                            <div className="flex justify-center w-full overflow-x-auto">
                                <GithubHeatmap commits={githubData?.commits} />
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>



            <div className="mt-6 md:mt-8">
                <div className="flex justify-between items-end mb-4 px-2">
                    <h3 className="text-xl font-bold text-white">Featured Projects</h3>
                    <button onClick={onShowProjects} className="text-sm text-neutral-500 hover:text-white transition-colors">See all</button>
                </div>

                <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={onShowProjects}
                            className="w-[400px] md:w-[420px] flex-none snap-start bg-neutral-900/40 border border-white/5 rounded-3xl p-4 group cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <div className="aspect-video h-80 w-full bg-black/50 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
                                {project.imageUrl && <Image src={project.imageUrl} alt={project.title} fill className="object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-500" />}
                            </div>
                            <h4 className="font-bold mb-1 truncate text-lg group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{project.description}</p>

                            <div className="mt-3 flex gap-2 flex-wrap h-6 overflow-hidden">
                                {project.techStack.slice(0, 3).map(t => (
                                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/5">{t}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section >
    );
}
