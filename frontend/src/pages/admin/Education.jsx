import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import { educationApi } from '../../services/resources'

const emptyEducation = {
    degree: '', institution: '', fieldOfStudy: '', startDate: '', endDate: '',
    location: '', description: '', grade: '', coursework: [], displayOrder: 0,
}

const AdminEducation = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyEducation)
    const [courseInput, setCourseInput] = useState('')

    const load = () => educationApi.getAll().then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptyEducation); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => {
        setForm({
            ...item,
            startDate: item.startDate?.slice(0, 10) || '',
            endDate: item.endDate?.slice(0, 10) || '',
        })
        setEditing(item._id)
        setModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await educationApi.update(editing, form)
            else await educationApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return
        await educationApi.remove(id)
        toast.success('Deleted')
        load()
    }

    const addCourse = () => {
        if (courseInput.trim()) {
            setForm({ ...form, coursework: [...form.coursework, courseInput.trim()] })
            setCourseInput('')
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Education</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Education
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.degree}</p>
                            <p className="text-xs text-slate-400">{item.institution}</p>
                        </div>
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input required placeholder="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Field of Study" value={form.fieldOfStudy} onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                        <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    </div>
                    <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="Grade / CGPA" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Coursework</label>
                        <div className="mt-1 flex gap-2">
                            <input value={courseInput} onChange={(e) => setCourseInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCourse() } }}
                                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                            <button type="button" onClick={addCourse} className="rounded-lg bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {form.coursework.map((c) => (
                                <span key={c} onClick={() => setForm({ ...form, coursework: form.coursework.filter((x) => x !== c) })}
                                    className="cursor-pointer rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800">{c} ×</span>
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

export default AdminEducation