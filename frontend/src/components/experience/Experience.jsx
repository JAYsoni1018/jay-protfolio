import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { experienceApi } from '../../services/resources'
import { formatDateRange } from '../../utils/formatDate'

const Experience = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        experienceApi.getAll().then((res) => setItems(res.data.data)).catch(() => { })
    }, [])

    if (items.length === 0) return null

    return (
        <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    Work <span className="text-indigo-500">Experience</span>
                </h2>
            </ScrollReveal>

            <div className="relative mt-12 border-l-2 border-slate-200 pl-8 dark:border-slate-800">
                {items.map((exp, i) => (
                    <ScrollReveal key={exp._id} delay={i * 0.1}>
                        <div className="relative mb-12 last:mb-0">
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white"
                            >
                                <Briefcase size={16} />
                            </motion.span>

                            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                                    <span className="text-sm text-slate-400">
                                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                                    </span>
                                </div>

                                <div className="mt-1 flex items-center gap-2">
                                    <p className="font-medium text-indigo-500">{exp.company}</p>
                                    {exp.isCurrent && (
                                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                                    {exp.employmentType && <span>{exp.employmentType}</span>}
                                    {exp.location && <span>{exp.location}</span>}
                                </div>

                                {exp.description && (
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{exp.description}</p>
                                )}

                                {exp.technologies?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default Experience