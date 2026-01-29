'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroPortal from '@/components/features/HeroPortal';
import HeroDashboard from '@/components/features/HeroDashboard';
import { Project, SocialPost } from '@prisma/client';

interface HomeWrapperProps {
    projects: Project[];
    socialPosts: SocialPost[];
    tweetNodes?: Record<string, React.ReactNode>;
    githubData: any;
}

import ProjectSlider from '@/components/features/ProjectSlider';
import SocialStack from '@/components/features/SocialStack';

type ViewState = 'portal' | 'dashboard' | 'projects' | 'social';

export default function HomeWrapper({ projects, socialPosts, tweetNodes, githubData }: HomeWrapperProps) {
    const [view, setView] = useState<ViewState>('portal');

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            <AnimatePresence mode="wait">
                {view === 'portal' && (
                    <motion.div
                        key="portal"
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-20"
                    >
                        <HeroPortal onEnter={() => setView('dashboard')} />
                    </motion.div>
                )}

                {view === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10 w-full min-h-screen"
                    >
                        <HeroDashboard
                            projects={projects}
                            socialPosts={socialPosts}
                            githubData={githubData}
                            onShowProjects={() => setView('projects')}
                            onShowSocial={() => setView('social')}
                        />
                    </motion.div>
                )}

                {view === 'projects' && (
                    <motion.div
                        key="projects"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10 w-full min-h-screen bg-black"
                    >
                        <div className="absolute top-6 left-6 z-50">
                            <button
                                onClick={() => setView('dashboard')}
                                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/10 hover:bg-white/20 transition-colors"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                        <ProjectSlider projects={projects} />
                    </motion.div>
                )}

                {view === 'social' && (
                    <motion.div
                        key="social"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10 w-full min-h-screen bg-black"
                    >
                        <div className="absolute top-6 left-6 z-50">
                            <button
                                onClick={() => setView('dashboard')}
                                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/10 hover:bg-white/20 transition-colors"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                        <SocialStack posts={socialPosts} tweetNodes={tweetNodes} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
