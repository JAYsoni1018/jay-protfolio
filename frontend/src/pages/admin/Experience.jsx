import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import { experienceApi } from '../../services/resources'

const emptyExperience = {
    jobTitle: '', company: '', location: '', employmentType: 'Full-time',
    startDate: '', endDate: '', isCurrent: false, description: '',
    technologies: [], displayOrder: 0,
}

const AdminExperience = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyExperience)
    const [techInput, setTechInput] = useState('')

    const load = () => experienceApi.getAll().then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptyExperience); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => {
        setForm({ ...item, startDate: item.startDate?.slice(0, 10) || '', endDate: item.endDate?.slice(0, 10) || '' })
        setEditing(item._id)
        setModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await experienceApi.update(editing, form)
            else await experienceApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return
        await experienceApi.remove(id)
        toast.success('Deleted')
        load()
    }

    const addTech = () => {
        if (techInput.trim()) {
            setForm({ ...form, technologies: [...form.technologies, techInput.trim()] })
            setTechInput('')
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Experience</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Experience
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.jobTitle}</p>
                            <p className="text-xs text-slate-400">{item.company}</p>
                        </div>
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Job Title" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input required placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <select value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700">
                        {['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                        <input type="date" disabled={form.isCurrent} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:border-slate-700" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="is-current" checked={form.isCurrent} onChange={(e) => setForm({ ...form, isCurrent: e.target.checked })} className="h-4 w-4" />
                        <label htmlFor="is-current" className="text-sm font-medium">Current Position</label>
                    </div>
                    <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Technologies</label>
                        <div className="mt-1 flex gap-2">
                            <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                            <button type="button" onClick={addTech} className="rounded-lg bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {form.technologies.map((t) => (
                                <span key={t} onClick={() => setForm({ ...form, technologies: form.technologies.filter((x) => x !== t) })}
                                    className="cursor-pointer rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800">{t} ×</span>
                            ))}
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

export default AdminExperience