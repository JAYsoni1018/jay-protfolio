import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import { socialLinksApi } from '../../services/resources'

const emptySocial = { platform: '', url: '', displayOrder: 0, isActive: true }

const AdminSocialLinks = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptySocial)

    const load = () => socialLinksApi.getAll().then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptySocial); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => { setForm(item); setEditing(item._id); setModalOpen(true) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await socialLinksApi.update(editing, form)
            else await socialLinksApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this link?')) return
        await socialLinksApi.remove(id)
        toast.success('Deleted')
        load()
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Social Links</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Link
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.platform}</p>
                            <p className="text-xs text-slate-400">{item.url}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-xs ${item.isActive ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Link' : 'Add Link'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Platform (e.g. GitHub, LinkedIn)" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input required placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="social-active" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="h-4 w-4" />
                        <label htmlFor="social-active" className="text-sm font-medium">Active</label>
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AdminSocialLinks