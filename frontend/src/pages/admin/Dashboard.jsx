import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FolderKanban, Sparkles, GraduationCap, Briefcase, Award, Mail,
    Plus, BadgeCheck, FileText,
} from 'lucide-react'
import StatCard from '../../components/admin/StatCard'
import { dashboardApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'

const AdminDashboard = () => {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        dashboardApi.stats().then((res) => setStats(res.data.data)).catch(() => { })
    }, [])

    if (!stats) {
        return <div className="flex h-64 items-center justify-center">Loading...</div>
    }

    const { counts, recentProjects, recentMessages, featuredProjects } = stats

    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Overview of your portfolio content</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <StatCard label="Projects" value={counts.projects} icon={FolderKanban} color="indigo" />
                <StatCard label="Skills" value={counts.skills} icon={Sparkles} color="purple" />
                <StatCard label="Education" value={counts.education} icon={GraduationCap} color="blue" />
                <StatCard label="Experience" value={counts.experience} icon={Briefcase} color="green" />
                <StatCard label="Achievements" value={counts.achievements} icon={Award} color="amber" />
                <StatCard label="Certificates" value={counts.certificates} icon={BadgeCheck} color="teal" />
                <StatCard label="Publications" value={counts.publications} icon={FileText} color="pink" />
                <StatCard label="Messages" value={`${counts.unreadMessages}/${counts.messages}`} icon={Mail} color="red" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/admin/projects" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Project
                </Link>
                <Link to="/admin/skills" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Plus size={16} /> Add Skill
                </Link>
                <Link to="/admin/resume" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    Upload Resume
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                    <h2 className="font-semibold">Recent Projects</h2>
                    <div className="mt-4 space-y-3">
                        {recentProjects?.length === 0 && <p className="text-sm text-slate-400">No projects yet.</p>}
                        {recentProjects?.map((p) => (
                            <div key={p._id} className="flex items-center justify-between text-sm">
                                <span>{p.title}</span>
                                <span className="text-slate-400">{formatDate(p.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                    <h2 className="font-semibold">Recent Messages</h2>
                    <div className="mt-4 space-y-3">
                        {recentMessages?.length === 0 && <p className="text-sm text-slate-400">No messages yet.</p>}
                        {recentMessages?.map((m) => (
                            <div key={m._id} className="flex items-center justify-between text-sm">
                                <span>{m.name} — {m.subject}</span>
                                <span className={m.isRead ? 'text-slate-400' : 'font-semibold text-indigo-500'}>
                                    {m.isRead ? 'Read' : 'New'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard