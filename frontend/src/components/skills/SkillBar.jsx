import { motion } from 'framer-motion'

const SkillBar = ({ skill }) => {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="text-slate-400">{skill.proficiency}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
            </div>
        </div>
    )
}

export default SkillBar