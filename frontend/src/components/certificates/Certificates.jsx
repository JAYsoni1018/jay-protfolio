import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { certificatesApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'

const Certificates = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        certificatesApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data)).catch(() => { })
    }, [])

    if (items.length === 0) return null

    return (
        <section id="certificates" className="mx-auto max-w-7xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    <span className="text-indigo-500">Certificates</span>
                </h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((cert, i) => (
                    <ScrollReveal key={cert._id} delay={i * 0.08}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="h-full overflow-hidden rounded-2xl border border-slate-200 transition-shadow hover:shadow-lg dark:border-slate-800"
                        >
                            {cert.image?.url && (
                                <img src={cert.image.url} alt={cert.title} className="h-40 w-full object-cover" />
                            )}

                            <div className="p-5">
                                <div className="flex items-center gap-2">
                                    <BadgeCheck size={16} className="text-indigo-500" />
                                    <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
                                        {cert.category}
                                    </span>
                                </div>
                                <h3 className="mt-1 font-semibold">{cert.title}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{cert.issuingOrganization}</p>

                                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                                    <span>Issued {formatDate(cert.issueDate)}</span>
                                    {cert.expiryDate && <span>Expires {formatDate(cert.expiryDate)}</span>}
                                </div>

                                {cert.skills?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {cert.skills.map((skill) => (
                                            <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:underline"
                                    >
                                        View Credential <ExternalLink size={13} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default Certificates