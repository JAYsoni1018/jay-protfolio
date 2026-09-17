import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Download, ArrowRight } from 'lucide-react'
import { heroApi } from '../../services/resources'

const Hero = () => {
    const [hero, setHero] = useState(null)

    useEffect(() => {
        heroApi.get().then((res) => setHero(res.data.data)).catch(() => { })
    }, [])

    if (!hero) {
        return (
            <section id="home" className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </section>
        )
    }

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6"
        >
            {/* animated background blobs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/20"
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/20"
                />
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {hero.title}
                    </span>

                    <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        Hi, I'm {hero.name}
                    </h1>

                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{hero.tagline}</p>
                    <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">{hero.introduction}</p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <a
                            href="#projects"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            View Projects <ArrowRight size={16} />
                        </a>

                        {hero.resumeUrl && (
                            <a
                                href={hero.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                <Download size={16} /> Resume
                            </a>
                        )}


                        <a href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            Contact Me
                        </a>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                        {hero.githubUrl && (
                            <a href={hero.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <Github size={18} />
                            </a>
                        )}
                        {hero.linkedinUrl && (
                            <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <Linkedin size={18} />
                            </a>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mx-auto"
                >
                    <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-800 sm:h-96 sm:w-96">
                        {hero.profilePhoto?.url ? (
                            <img src={hero.profilePhoto.url} alt={hero.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-5xl font-bold text-slate-400 dark:bg-slate-800">
                                {hero.name?.[0]}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero