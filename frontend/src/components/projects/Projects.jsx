import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollReveal from '../common/ScrollReveal'
import ProjectCard from './ProjectCard'
import ProjectFilters from './ProjectFilters'
import { projectsApi } from '../../services/resources'
import { ProjectCardSkeleton } from '../common/Skeleton'

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [activeFilter, setActiveFilter] = useState('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        projectsApi
            .getAll({ limit: 100 })
            .then((res) => setProjects(res.data.data))
            .finally(() => setLoading(false))
    }, [])

    const categories = useMemo(
        () => [...new Set(projects.map((p) => p.category))].filter(Boolean),
        [projects]
    )

    const filtered = useMemo(() => {
        if (activeFilter === 'All') return projects
        if (activeFilter === 'Featured') return projects.filter((p) => p.featured)
        return projects.filter((p) => p.category === activeFilter)
    }, [projects, activeFilter])

    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-6 py-24">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)}
                </div>
            </section>
        )
    }
    if (projects.length === 0) return null

    return (
        <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    Featured <span className="text-indigo-500">Projects</span>
                </h2>
                <ProjectFilters
                    categories={[...categories, 'Featured']}
                    active={activeFilter}
                    onChange={setActiveFilter}
                />
            </ScrollReveal>

            <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <p className="mt-10 text-center text-slate-400">No projects found in this category.</p>
            )}
        </section>
    )
}

export default Projects