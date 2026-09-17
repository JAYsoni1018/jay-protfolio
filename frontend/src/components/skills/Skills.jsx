import { useEffect, useState } from 'react'
import ScrollReveal from '../common/ScrollReveal'
import SkillBar from './SkillBar'
import { skillsApi, skillCategoriesApi } from '../../services/resources'

const Skills = () => {
    const [categories, setCategories] = useState([])
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([skillCategoriesApi.getAll(), skillsApi.getAll({ limit: 200 })])
            .then(([catRes, skillRes]) => {
                setCategories(catRes.data.data)
                setSkills(skillRes.data.data)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return null
    if (categories.length === 0) return null

    return (
        <section id="skills" className="mx-auto max-w-7xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl">
                    Skills & <span className="text-indigo-500">Technologies</span>
                </h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                {categories.map((cat, catIndex) => {
                    const categorySkills = skills
                        .filter((s) => s.category === cat._id || s.category?._id === cat._id)
                        .sort((a, b) => a.displayOrder - b.displayOrder)

                    if (categorySkills.length === 0) return null

                    return (
                        <ScrollReveal key={cat._id} delay={catIndex * 0.1}>
                            <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                                <h3 className="mb-5 text-lg font-semibold">{cat.name}</h3>
                                <div className="space-y-4">
                                    {categorySkills.map((skill) => (
                                        <SkillBar key={skill._id} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    )
                })}
            </div>
        </section>
    )
}

export default Skills