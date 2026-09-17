import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import { skillsApi, skillCategoriesApi } from '../../services/resources'

const emptySkill = { name: '', category: '', proficiency: 80, featured: false, displayOrder: 0 }

const AdminSkills = () => {
    const [categories, setCategories] = useState([])
    const [skills, setSkills] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptySkill)
    const [newCategory, setNewCategory] = useState('')

    const load = () => {
        skillCategoriesApi.getAll().then((res) => setCategories(res.data.data))
        skillsApi.getAll({ limit: 200 }).then((res) => setSkills(res.data.data))
    }

    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptySkill); setEditing(null); setModalOpen(true) }
    const openEdit = (skill) => {
        setForm({ ...skill, category: skill.category?._id || skill.category })
        setEditing(skill._id)
        setModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await skillsApi.update(editing, form)
            else await skillsApi.create(form)
            toast.success(editing ? 'Skill updated' : 'Skill added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save skill')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this skill?')) return
        await skillsApi.remove(id)
        toast.success('Skill deleted')
        load()
    }

    const addCategory = async () => {
        if (!newCategory.trim()) return
        await skillCategoriesApi.create({ name: newCategory.trim(), displayOrder: categories.length })
        setNewCategory('')
        load()
    }

    const deleteCategory = async (id) => {
        if (!window.confirm('Delete this category? Skills inside it will remain but lose their category.')) return
        await skillCategoriesApi.remove(id)
        load()
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Skills</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Skill
                </button>
            </div>

            {/* Category management */}
            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h2 className="text-sm font-semibold">Categories</h2>
                <div className="mt-2 flex gap-2">
                    <input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                        className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                    />
                    <button onClick={addCategory} className="rounded-lg bg-slate-100 px-4 text-sm font-medium dark:bg-slate-800">Add</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <span key={cat._id} className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">
                            {cat.name}
                            <button onClick={() => deleteCategory(cat._id)} className="text-red-400">×</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Skills table */}
            <div className="mt-6 space-y-2">
                {skills.map((skill) => (
                    <div key={skill._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{skill.name}</p>
                            <p className="text-xs text-slate-400">
                                {categories.find((c) => c._id === (skill.category?._id || skill.category))?.name} · {skill.proficiency}%
                            </p>
                        </div>
                        <button onClick={() => openEdit(skill)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(skill._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700">
                            <option value="">Select category</option>
                            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Proficiency: {form.proficiency}%</label>
                        <input type="range" min="0" max="100" value={form.proficiency}
                            onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} className="mt-1 w-full" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="skill-featured" checked={form.featured}
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4" />
                        <label htmlFor="skill-featured" className="text-sm font-medium">Featured</label>
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                        Save Skill
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AdminSkills