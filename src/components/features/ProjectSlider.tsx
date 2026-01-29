'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectSliderProps {
    projects: any[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
    const [activeProject, setActiveProject] = useState(projects[0]);


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
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] z-0 pointer-events-none opacity-20" />


            <div className="absolute inset-0 z-10 flex">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 pt-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex gap-3 mb-6">
                                {activeProject.techStack?.map((t: string) => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-bold text-emerald-400 uppercase tracking-widest backdrop-blur-md">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-heading leading-tight tracking-tighter">
                                {activeProject.title}
                            </h2>

                            <p className="text-neutral-300 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light">
                                {activeProject.description}
                            </p>

                            <div className="flex gap-4">
                                <a href={activeProject.demoUrl || "#"} target="_blank" className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                                    Discover <ArrowUpRight size={20} />
                                </a>
                                <a href={activeProject.repoUrl || "#"} target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                    <Github size={24} />
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            <div className="absolute bottom-12 right-0 w-full md:w-1/2 z-20 overflow-visible">
                <div className="flex items-center gap-6 overflow-hidden mask-image-linear-to-r">
                    <motion.div
                        className="flex gap-6 pl-6"
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
                                className={`shrink-0 w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden relative cursor-pointer group border transition-all duration-300 ${activeProject.id === project.id ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/10 hover:border-white/30'}`}
                            >
                                <img
                                    src={project.imageUrl || "https://images.unsplash.com/photo-1481487484168-9b930d55208d?auto=format&fit=crop&q=80"}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                                    <p className="text-xs text-neutral-400 line-clamp-2">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-12 left-12 md:left-20 text-white/20 text-9xl font-black font-heading z-0 pointer-events-none select-none">
                0{projects.findIndex(p => p.id === activeProject.id) + 1}
            </div>

        </section>
    );
}
