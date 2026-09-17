import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { achievementsApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'

const Achievements = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        achievementsApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data)).catch(() => { })
    }, [])

    if (items.length === 0) return null

    return (
        <section id="achievements" className="mx-auto max-w-7xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    <span className="text-indigo-500">Achievements</span> & Awards
                </h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                    <ScrollReveal key={item._id} delay={i * 0.08}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="group h-full rounded-2xl border border-slate-200 p-6 transition-shadow hover:shadow-lg dark:border-slate-800"
                        >
                            <div className="flex items-start gap-4">
                                {item.image?.url ? (
                                    <img src={item.image.url} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                        <Award size={20} />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
                                        {item.category}
                                    </span>
                                    <h3 className="mt-0.5 font-semibold">{item.title}</h3>
                                </div>
                            </div>

                            {item.description && (
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                            )}

                            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                                <span>{item.organization}</span>
                                <span>{formatDate(item.date)}</span>
                            </div>

                            {item.verificationUrl && (

                                <a href={item.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-block text-sm font-medium text-indigo-500 hover:underline"
                                >
                                    Verify →
                                </a>
                            )}
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default Achievements