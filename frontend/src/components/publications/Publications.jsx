import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { publicationsApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'

const Publications = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        publicationsApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data)).catch(() => { })
    }, [])

    if (items.length === 0) return null

    return (
        <section id="publications" className="mx-auto max-w-5xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    Research <span className="text-indigo-500">Publications</span>
                </h2>
            </ScrollReveal>

            <div className="mt-12 space-y-6">
                {items.map((pub, i) => (
                    <ScrollReveal key={pub._id} delay={i * 0.08}>
                        <motion.div
                            whileHover={{ x: 4 }}
                            className="flex gap-5 rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
                        >
                            <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 sm:flex">
                                <FileText size={20} />
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        {pub.venueType}
                                    </span>
                                    {pub.featured && (
                                        <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-2 font-semibold">{pub.title}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {pub.authors?.join(', ')} · {pub.venue} · {formatDate(pub.publicationDate, { year: 'numeric', month: 'short' })}
                                </p>

                                {pub.abstract && (
                                    <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{pub.abstract}</p>
                                )}

                                {pub.tags?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {pub.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-3 flex gap-4">
                                    {pub.paperUrl && (
                                        <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:underline">
                                            View Paper <ExternalLink size={13} />
                                        </a>
                                    )}
                                    {pub.pdfUrl && (
                                        <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-500 hover:underline">
                                            PDF
                                        </a>
                                    )}
                                    {pub.doiUrl && (
                                        <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-500 hover:underline">
                                            DOI
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default Publications