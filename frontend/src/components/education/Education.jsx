import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { educationApi } from '../../services/resources'
import { formatDateRange } from '../../utils/formatDate'

const Education = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        educationApi.getAll().then((res) => setItems(res.data.data)).catch(() => { })
    }, [])

    if (items.length === 0) return null

    return (
        <section id="education" className="mx-auto max-w-5xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    <span className="text-indigo-500">Education</span> Timeline
                </h2>
            </ScrollReveal>

            <div className="relative mt-12 border-l-2 border-slate-200 pl-8 dark:border-slate-800">
                {items.map((edu, i) => (
                    <ScrollReveal key={edu._id} delay={i * 0.1}>
                        <div className="relative mb-12 last:mb-0">
                            <motion.span
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white"
                            >
                                <GraduationCap size={16} />
                            </motion.span>

                            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                    <span className="text-sm text-slate-400">
                                        {formatDateRange(edu.startDate, edu.endDate)}
                                    </span>
                                </div>
                                <p className="mt-1 font-medium text-indigo-500">{edu.institution}</p>
                                {edu.fieldOfStudy && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{edu.fieldOfStudy}</p>
                                )}
                                {edu.description && (
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{edu.description}</p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                    {edu.grade && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
                                            Grade: {edu.grade}
                                        </span>
                                    )}
                                    {edu.location && <span className="text-slate-400">{edu.location}</span>}
                                </div>

                                {edu.coursework?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {edu.coursework.map((course) => (
                                            <span
                                                key={course}
                                                className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400"
                                            >
                                                {course}
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

export default Education