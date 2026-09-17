import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import ImageUploader from '../../components/admin/ImageUploader'
import { achievementsApi } from '../../services/resources'

const emptyAchievement = {
    title: '', description: '', date: '', organization: '',
    verificationUrl: '', category: 'General', displayOrder: 0, image: null,
}

const AdminAchievements = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyAchievement)

    const load = () => achievementsApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptyAchievement); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => { setForm({ ...item, date: item.date?.slice(0, 10) || '' }); setEditing(item._id); setModalOpen(true) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await achievementsApi.update(editing, form)
            else await achievementsApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this achievement?')) return
        await achievementsApi.remove(id)
        toast.success('Deleted')
        load()
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Achievements</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Achievement
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.category} · {item.organization}</p>
                        </div>
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Achievement' : 'Add Achievement'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Category (e.g. Hackathon, Award)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Verification URL" value={form.verificationUrl} onChange={(e) => setForm({ ...form, verificationUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Certificate/Image</label>
                        <div className="mt-1">
                            <ImageUploader
                                images={form.image ? [{ ...form.image, isPrimary: true }] : []}
                                onChange={(images) => setForm({ ...form, image: images[0] || null })}
                                folder="achievements"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AdminAchievements