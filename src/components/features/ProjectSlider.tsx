'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectSliderProps {
    projects: any[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
    const [activeProject, setActiveProject] = useState(projects[0]);


    const nextProject = () => {
        const currentIndex = projects.findIndex(p => p.id === activeProject.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setActiveProject(projects[nextIndex]);
    };

    const prevProject = () => {
        const currentIndex = projects.findIndex(p => p.id === activeProject.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        setActiveProject(projects[prevIndex]);
    };

    if (!projects || projects.length === 0) return null;

    return (
        <section className="relative w-full h-screen overflow-hidden bg-neutral-900 border-t border-white/10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={activeProject.imageUrl || "https://images.unsplash.com/photo-1481487484168-9b930d55208d?auto=format&fit=crop&q=80"}
                        className="w-full h-full object-cover opacity-70 blur-sm scale-105"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none opacity-20" />


            <div className="absolute inset-0 z-10 flex pointer-events-none">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-end md:justify-center px-6 md:px-20 pb-24 md:pt-0 md:pb-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="pointer-events-auto md:bg-transparent p-0 md:p-0 rounded-none md:rounded-none backdrop-blur-none md:backdrop-blur-none border-none md:border-none"
                        >
                            <div className="flex gap-2 mb-4 md:mb-6 flex-wrap">
                                {activeProject.techStack?.map((t: string) => (
                                    <span key={t} className="px-2 md:px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] md:text-xs font-bold text-[#34D399] uppercase tracking-widest backdrop-blur-md">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-4xl md:text-8xl font-bold text-white mb-3 md:mb-8 font-heading leading-tight tracking-tighter shadow-black drop-shadow-lg md:drop-shadow-none">
                                {activeProject.title}
                            </h2>

                            <p className="text-neutral-200 md:text-neutral-300 text-sm md:text-xl max-w-lg mb-6 md:mb-12 leading-relaxed font-light line-clamp-3 md:line-clamp-none drop-shadow-md md:drop-shadow-none">
                                {activeProject.description}
                            </p>

                            <div className="flex gap-3 md:gap-4">
                                {activeProject.demoUrl && (
                                    <a href={activeProject.demoUrl} target="_blank" className="px-6 py-3 md:px-8 md:py-4 bg-white text-black text-xs md:text-base font-bold rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg shadow-black/20">
                                        Discover <ArrowUpRight size={16} className="md:w-5 md:h-5" />
                                    </a>
                                )}
                                {activeProject.repoUrl && (
                                    <a href={activeProject.repoUrl} target="_blank" className="p-3 md:p-4 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md">
                                        <Github size={18} className="md:w-6 md:h-6" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-between px-6 md:hidden pointer-events-auto">
                <button
                    onClick={(e) => { e.stopPropagation(); prevProject(); }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white active:scale-95 transition-transform"
                >
                    ← Prev
                </button>
                <div className="flex gap-1.5 items-center">
                    {projects.map((p, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${projects[i].id === activeProject.id ? 'bg-[#34D399]' : 'bg-white/20'}`} />
                    ))}
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); nextProject(); }}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white active:scale-95 transition-transform"
                >
                    Next →
                </button>
            </div>


            <div className="absolute bottom-6 md:bottom-12 right-0 w-full md:w-1/2 z-20 overflow-visible pointer-events-none hidden md:block">
                <div className="flex items-center gap-4 md:gap-6 overflow-hidden mask-image-linear-to-r pl-4 md:pl-0">
                    <motion.div
                        className="flex gap-3 md:gap-6"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            }
                        }}
                    >
                        {[...projects, ...projects, ...projects].map((project, i) => (
                            <motion.div
                                key={`${project.id}-${i}`}
                                onClick={() => setActiveProject(project)}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className={`pointer-events-auto shrink-0 w-24 h-32 md:w-80 md:h-96 rounded-xl md:rounded-3xl overflow-hidden relative cursor-pointer group border transition-all duration-300 ${activeProject.id === project.id ? 'border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/10 hover:border-white/30'}`}
                            >
                                <img
                                    src={project.imageUrl || "https://images.unsplash.com/photo-1481487484168-9b930d55208d?auto=format&fit=crop&q=80"}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="hidden md:block absolute bottom-6 left-6 right-6">
                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-[#34D399] transition-colors">{project.title}</h4>
                                    <p className="text-xs text-neutral-400 line-clamp-2">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-24 left-6 md:top-auto md:bottom-12 md:left-20 text-white/5 md:text-white/10 text-6xl md:text-9xl font-black font-heading z-0 pointer-events-none select-none">
                0{projects.findIndex(p => p.id === activeProject.id) + 1}
            </div>

        </section>
    );
}
