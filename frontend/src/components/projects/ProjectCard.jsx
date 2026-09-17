import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ project }) => {
    const thumbnail = project.thumbnail?.url || project.images?.[0]?.url

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
            <div className="relative h-52 overflow-hidden">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <span className="text-slate-400">No image</span>
                    </div>
                )}

                {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                        Featured
                    </span>
                )}

                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.githubUrl && (

                        <a href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full bg-white p-2.5 text-slate-900 transition hover:scale-110"
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {project.liveDemoUrl && (

                        <a href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full bg-white p-2.5 text-slate-900 transition hover:scale-110"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-wide text-indigo-500">
                    {project.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {project.shortDescription}
                </p>

                {project.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                <Link
                    to={`/projects/${project.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:gap-2 transition-all dark:text-indigo-400"
                >
                    View Details <ArrowUpRight size={15} />
                </Link>
            </div>
        </motion.div>
    )
}

export default ProjectCard