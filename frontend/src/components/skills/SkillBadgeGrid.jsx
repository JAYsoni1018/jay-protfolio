const SkillBadgeGrid = ({ categories, skills }) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat) => {
            const categorySkills = skills
                .filter((s) => s.category === cat._id || s.category?._id === cat._id)
                .sort((a, b) => a.displayOrder - b.displayOrder)
            if (categorySkills.length === 0) return null

            return (
                <div key={cat._id} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">{cat.name}</h3>
                    <div className="flex flex-wrap gap-2.5">
                        {categorySkills.map((skill) => (
                            <span
                                key={skill._id}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium dark:border-slate-700"
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
)

export default SkillBadgeGrid