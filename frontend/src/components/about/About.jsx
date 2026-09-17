import { useEffect, useState } from 'react'
import ScrollReveal from '../common/ScrollReveal'
import { aboutApi } from '../../services/resources'

const About = () => {
    const [about, setAbout] = useState(null)

    useEffect(() => {
        aboutApi.get().then((res) => setAbout(res.data.data)).catch(() => { })
    }, [])

    if (!about) return null

    return (
        <section id="about" className="mx-auto max-w-7xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    About <span className="text-indigo-500">Me</span>
                </h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
                <ScrollReveal direction="right">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-slate-800">
                        {about.profileImage?.url ? (
                            <img src={about.profileImage.url} alt="About" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-80 items-center justify-center bg-slate-100 dark:bg-slate-800">
                                <span className="text-slate-400">No image set</span>
                            </div>
                        )}
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.1}>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{about.biography}</p>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{about.professionalSummary}</p>

                    {about.careerFocus && (
                        <p className="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            Focus: {about.careerFocus}
                        </p>
                    )}

                    {about.interests?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {about.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    )}
                </ScrollReveal>
            </div>

            {about.stats?.length > 0 && (
                <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {[...about.stats]
                        .sort((a, b) => a.order - b.order)
                        .map((stat, i) => (
                            <ScrollReveal key={stat.label} delay={i * 0.08}>
                                <div className="rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
                                    <div className="text-3xl font-bold text-indigo-500">{stat.value}</div>
                                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                </div>
            )}
        </section>
    )
}

export default About