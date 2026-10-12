import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Mail, Phone } from 'lucide-react'
import { heroApi } from '../../services/resources'
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { downloadFile, slugifyFilename } from '../../utils/downloadFile'
import { socialLinksApi } from '../../services/resources'
const Hero = () => {
    const [hero, setHero] = useState(null)
    const [socials, setSocials] = useState([])

    useEffect(() => {
        socialLinksApi.getAll().then((res) => setSocials(res.data.data.filter((s) => s.isActive))).catch(() => { })
    }, [])

    const findSocial = (platform) => socials.find((s) => s.platform === platform)?.url
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
    const github = findSocial('GitHub')
    const linkedin = findSocial('LinkedIn')
    const email = findSocial('Email')
    const phone = findSocial('Phone')
    const emailAddress = email?.replace(/^mailto:/i, '')
    const phoneNumber = phone?.replace(/^tel:/i, '')
    const emailHref = email?.startsWith('mailto:') ? email : `mailto:${email}`
    const phoneHref = phone?.startsWith('tel:') ? phone : `tel:${phone}`
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20"
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
                            <button
                                onClick={() => downloadFile(hero.resumeUrl, `jay-${slugifyFilename(hero.name || 'resume')}-resume.pdf`)}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                <Download size={16} /> Resume
                            </button>
                        )}


                        <a href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            Contact Me
                        </a>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                        {github && (
                            <a href={github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <FaGithub size="18" />
                            </a>
                        )}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <FaLinkedinIn size="18" />

                            </a>
                        )}
                        {email && (
                            <a href={emailHref} className="inline-flex max-w-45 items-center gap-2 truncate rounded-full border border-slate-300 px-3 py-2 text-xs sm:max-w-none sm:px-4 sm:py-2.5 sm:text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <Mail size={16} className="shrink-0" /> <span className="truncate">{emailAddress}</span>
                            </a>
                        )}
                        {phone && (
                            <a href={phoneHref} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <Phone size={16} /> {phoneNumber}
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