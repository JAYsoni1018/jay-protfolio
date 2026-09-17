import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../components/admin/Sidebar'
import ThemeToggle from '../components/common/ThemeToggle'

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64">
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900 lg:justify-end">
                    <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Menu size={22} />
                    </button>
                    <ThemeToggle />
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout