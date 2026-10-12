import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, ExternalLink, Download, FileText } from 'lucide-react'
import ScrollReveal from '../common/ScrollReveal'
import { certificatesApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'
import { downloadFile, getExtension, slugifyFilename } from '../../utils/downloadFile'
const Certificates = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        certificatesApi.getAll({ limit: 100 }).then((res) => {
            const sorted = res.data.data.filter((item) => item.isActive !== false).sort((a, b) => b.displayOrder - a.displayOrder)
            setItems(sorted)
        }).catch(() => { })
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
                            {cert.image?.url ? (
                                <div className="group/img relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {(cert.image.isPdf || cert.image.url?.toLowerCase().endsWith('.pdf')) ? (
                                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                                            <FileText size={36} />
                                            <span className="text-xs font-medium">PDF Document</span>
                                        </div>
                                    ) : (
                                        <img src={cert.image.url} alt={cert.title} className="h-full w-full object-cover" />
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            downloadFile(cert.image.url, `jay-certificate-${slugifyFilename(cert.title)}.${getExtension(cert.image.url)}`)
                                        }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover/img:opacity-100"
                                    >
                                        <span className="rounded-full bg-white p-2.5 text-slate-900">
                                            <Download size={16} />
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-sm text-slate-400 dark:bg-slate-800">
                                    No image
                                </div>
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

                                <div className="mt-4 flex items-center gap-4">
                                    {cert.credentialUrl && (
                                        <a
                                            href={cert.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-indigo-500"
                                        >
                                            View Credential <ExternalLink size={13} />
                                        </a>
                                    )}
                                    {cert.image?.url && (
                                        <button
                                            onClick={() => downloadFile(cert.image.url, `jay-certificate-${slugifyFilename(cert.title)}.${getExtension(cert.image.url)}`)}
                                            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-indigo-500"
                                        >
                                            Download <Download size={13} />
                                        </button>
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

export default Certificates