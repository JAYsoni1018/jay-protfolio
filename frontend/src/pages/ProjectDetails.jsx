import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowLeft } from 'lucide-react'
import Navbar from '../components/navbar/Navbar'
import ProjectGallery from '../components/projects/ProjectGallery'
import RichTextRenderer from '../components/common/RichTextRenderer'
import { projectsApi } from '../services/resources'
import { formatDate } from '../utils/formatDate'
import SEO from '../components/common/SEO'

const ProjectDetails = () => {
    const { slug } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        setLoading(true)
        setNotFound(false)
        projectsApi
            .getAll({ limit: 200 }) // simplest: filter client-side by slug
            .then((res) => {
                const found = res.data.data.find((p) => p.slug === slug)
                if (found) setProject(found)
                else setNotFound(true)
            })
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
            </div>
        )
    }

    if (notFound || !project) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-lg text-slate-500">Project not found.</p>
                <Link to="/" className="text-indigo-500 hover:underline">Back to home</Link>
            </div>
        )
    }

    const allImages = project.images?.length > 0 ? project.images : (project.thumbnail ? [project.thumbnail] : [])

    return (
        <div>
            <Navbar />

            <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
                <Link to="/#projects" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-500">
                    <ArrowLeft size={16} /> Back to projects
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="mt-6 inline-block text-xs font-medium uppercase tracking-wide text-indigo-500">
                        {project.category}
                    </span>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{project.title}</h1>
                    <p className="mt-3 text-slate-500 dark:text-slate-400">{project.shortDescription}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        {project.startDate && (
                            <span>{formatDate(project.startDate)} — {project.endDate ? formatDate(project.endDate) : 'Present'}</span>
                        )}
                    </div>

                    {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex gap-3">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                                <Github size={16} /> GitHub
                            </a>
                        )}
                        {project.liveDemoUrl && (
                            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                                <ExternalLink size={16} /> Live Demo
                            </a>
                        )}
                    </div>
                </motion.div>
                //no idea this is right location or not
                <SEO
                    title={project.title}
                    description={project.shortDescription}
                    image={project.thumbnail?.url || project.images?.[0]?.url}
                />
                {allImages.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-10">
                        <ProjectGallery images={allImages} />
                    </motion.div>
                )}

                {project.fullDescription && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10">
                        <RichTextRenderer html={project.fullDescription} />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ProjectDetails