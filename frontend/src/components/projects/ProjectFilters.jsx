import { motion } from 'framer-motion'

const ProjectFilters = ({ categories, active, onChange }) => {
    return (
        <div className="mt-8 flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                    className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                    {active === cat && (
                        <motion.span
                            layoutId="filter-pill"
                            className="absolute inset-0 rounded-full bg-indigo-600"
                            transition={{ type: 'spring', duration: 0.5 }}
                        />
                    )}
                    <span className={`relative z-10 ${active === cat ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                        {cat}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default ProjectFilters