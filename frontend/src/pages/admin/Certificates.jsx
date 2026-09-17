import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import ImageUploader from '../../components/admin/ImageUploader'
import { certificatesApi } from '../../services/resources'

const emptyCertificate = {
    title: '', issuingOrganization: '', issueDate: '', expiryDate: '',
    credentialId: '', credentialUrl: '', skills: [], category: 'General',
    featured: false, displayOrder: 0, image: null,
}

const AdminCertificates = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyCertificate)
    const [skillInput, setSkillInput] = useState('')

    const load = () => certificatesApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptyCertificate); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => {
        setForm({ ...item, issueDate: item.issueDate?.slice(0, 10) || '', expiryDate: item.expiryDate?.slice(0, 10) || '' })
        setEditing(item._id)
        setModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await certificatesApi.update(editing, form)
            else await certificatesApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this certificate?')) return
        await certificatesApi.remove(id)
        toast.success('Deleted')
        load()
    }

    const addSkill = () => {
        if (skillInput.trim()) {
            setForm({ ...form, skills: [...form.skills, skillInput.trim()] })
            setSkillInput('')
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Certificates</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Certificate
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.issuingOrganization}</p>
                        </div>
                        {item.featured && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">Featured</span>}
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Certificate' : 'Add Certificate'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input required placeholder="Issuing Organization" value={form.issuingOrganization} onChange={(e) => setForm({ ...form, issuingOrganization: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Category (e.g. Cloud, AI/ML)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-400">Issue Date</label>
                            <input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400">Expiry Date (optional)</label>
                            <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                        </div>
                    </div>
                    <input placeholder="Credential ID" value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Credential URL" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Skills covered</label>
                        <div className="mt-1 flex gap-2">
                            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
                                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                            <button type="button" onClick={addSkill} className="rounded-lg bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {form.skills.map((s) => (
                                <span key={s} onClick={() => setForm({ ...form, skills: form.skills.filter((x) => x !== s) })}
                                    className="cursor-pointer rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800">{s} ×</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Certificate Image</label>
                        <div className="mt-1">
                            <ImageUploader
                                images={form.image ? [{ ...form.image, isPrimary: true }] : []}
                                onChange={(images) => setForm({ ...form, image: images[0] || null })}
                                folder="certificates"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="cert-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4" />
                        <label htmlFor="cert-featured" className="text-sm font-medium">Featured</label>
                    </div>

                    <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AdminCertificates