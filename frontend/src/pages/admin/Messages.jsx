import { useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { contactApi } from '../../services/resources'
import { formatDate } from '../../utils/formatDate'

const AdminMessages = () => {
    const [messages, setMessages] = useState([])
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)

    const load = () => contactApi.getAll({ limit: 100 }).then((res) => setMessages(res.data.data))
    useEffect(() => { load() }, [])

    const openMessage = async (msg) => {
        setSelected(msg)
        if (!msg.isRead) {
            await contactApi.markRead(msg._id)
            load()
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return
        await contactApi.remove(id)
        toast.success('Deleted')
        if (selected?._id === id) setSelected(null)
        load()
    }

    const filtered = messages.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <h1 className="text-2xl font-bold">Messages</h1>

            <div className="relative mt-4 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..."
                    className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-2 lg:col-span-1">
                    {filtered.length === 0 && <p className="text-sm text-slate-400">No messages found.</p>}
                    {filtered.map((msg) => (
                        <button
                            key={msg._id}
                            onClick={() => openMessage(msg)}
                            className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${selected?._id === msg._id ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {msg.isRead ? <MailOpen size={16} className="mt-0.5 text-slate-400" /> : <Mail size={16} className="mt-0.5 text-indigo-500" />}
                            <div className="flex-1 min-w-0">
                                <p className={`truncate text-sm ${msg.isRead ? 'font-normal' : 'font-semibold'}`}>{msg.name}</p>
                                <p className="truncate text-xs text-slate-400">{msg.subject}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-2">
                    {selected ? (
                        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-semibold">{selected.subject}</h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {selected.name} · {selected.email}
                                    </p>
                                    <p className="text-xs text-slate-400">{formatDate(selected.createdAt, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                </div>
                                <button onClick={() => handleDelete(selected._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-300">{selected.message}</p>
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center text-sm text-slate-400">Select a message to view</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminMessages