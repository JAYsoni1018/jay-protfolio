import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Download, FileText } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { achievementsApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'
import { downloadFile, getExtension, slugifyFilename } from '../../utils/downloadFile'

const Achievements = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        achievementsApi.getAll({ limit: 100 }).then((res) => {
            const sorted = res.data.data.filter((item) => item.isActive !== false).sort((a, b) => b.displayOrder - a.displayOrder)
            setItems(sorted)
        }).catch(() => { })
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
                                    (item.image.isPdf || item.image.url?.toLowerCase().endsWith('.pdf')) ? (
                                        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800">
                                            <FileText size={32} />
                                        </div>
                                    ) : (
                                        <img src={item.image.url} alt={item.title} className="h-20 w-20 flex-shrink-0 rounded-lg object-cover" />
                                    )
                                ) : (
                                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                        <Award size={24} />
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

                            <div className="mt-3 flex items-center gap-4">
                                {item.verificationUrl && (
                                    <a
                                        href={item.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-sm font-medium text-indigo-500 cursor-pointer"
                                    >
                                        Verify →
                                    </a>
                                )}
                                {item.image?.url && (
                                    <button
                                        onClick={() => {
                                            downloadFile(item.image.url, `jay-achievement-${slugifyFilename(item.title)}.${getExtension(item.image.url)}`)
                                        }}
                                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 cursor-pointer "
                                    >
                                        Download <Download size={13} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default Achievements