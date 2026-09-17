import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, User, Sparkles, GraduationCap, Briefcase, FolderKanban,
    Award, BadgeCheck, FileText, Link2, Mail, FileBadge, Settings, LogOut, X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/hero', label: 'Hero', icon: Sparkles },
    { to: '/admin/about', label: 'About', icon: User },
    { to: '/admin/skills', label: 'Skills', icon: Sparkles },
    { to: '/admin/education', label: 'Education', icon: GraduationCap },
    { to: '/admin/experience', label: 'Experience', icon: Briefcase },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { to: '/admin/achievements', label: 'Achievements', icon: Award },
    { to: '/admin/certificates', label: 'Certificates', icon: BadgeCheck },
    { to: '/admin/publications', label: 'Publications', icon: FileText },
    { to: '/admin/resume', label: 'Resume', icon: FileBadge },
    { to: '/admin/social-links', label: 'Social Links', icon: Link2 },
    { to: '/admin/messages', label: 'Messages', icon: Mail },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const Sidebar = ({ open, onClose }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        toast.success('Logged out')
        navigate('/admin/login')
    }

    return (
        <>
            {/* mobile overlay */}
            {open && (
                <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-lg font-bold">
                        Admin<span className="text-indigo-500">.</span>
                    </span>
                    <button onClick={onClose} className="lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            <item.icon size={17} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-slate-200 p-3 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                        <LogOut size={17} /> Logout
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar