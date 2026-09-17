import { motion } from 'framer-motion'

const StatCard = ({ label, value, icon: Icon, color = 'indigo' }) => (
    <motion.div
        whileHover={{ y: -3 }}
        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 text-2xl font-bold">{value}</p>
            </div>
            <div className={`rounded-xl bg-${color}-100 p-3 text-${color}-600 dark:bg-${color}-500/10 dark:text-${color}-400`}>
                <Icon size={20} />
            </div>
        </div>
    </motion.div>
)

export default StatCard