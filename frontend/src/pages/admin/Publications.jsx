import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Modal from '../../components/admin/Modal'
import { publicationsApi } from '../../services/resources'

const emptyPublication = {
    title: '', authors: [], venue: '', venueType: 'Conference', publicationDate: '',
    abstract: '', doiUrl: '', pdfUrl: '', paperUrl: '', tags: [], featured: false, displayOrder: 0,
}

const AdminPublications = () => {
    const [items, setItems] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyPublication)
    const [authorInput, setAuthorInput] = useState('')
    const [tagInput, setTagInput] = useState('')

    const load = () => publicationsApi.getAll({ limit: 100 }).then((res) => setItems(res.data.data))
    useEffect(() => { load() }, [])

    const openAdd = () => { setForm(emptyPublication); setEditing(null); setModalOpen(true) }
    const openEdit = (item) => {
        setForm({ ...item, publicationDate: item.publicationDate?.slice(0, 10) || '' })
        setEditing(item._id)
        setModalOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editing) await publicationsApi.update(editing, form)
            else await publicationsApi.create(form)
            toast.success(editing ? 'Updated' : 'Added')
            setModalOpen(false)
            load()
        } catch {
            toast.error('Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this publication?')) return
        await publicationsApi.remove(id)
        toast.success('Deleted')
        load()
    }

    const addAuthor = () => {
        if (authorInput.trim()) {
            setForm({ ...form, authors: [...form.authors, authorInput.trim()] })
            setAuthorInput('')
        }
    }

    const addTag = () => {
        if (tagInput.trim()) {
            setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
            setTagInput('')
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-bold">Publications</h1>
                <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    <Plus size={16} /> Add Publication
                </button>
            </div>

            <div className="mt-6 space-y-2">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.venue} · {item.venueType}</p>
                        </div>
                        {item.featured && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">Featured</span>}
                        <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"><Trash2 size={16} /></button>
                    </div>
                ))}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Publication' : 'Add Publication'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Authors</label>
                        <div className="mt-1 flex gap-2">
                            <input value={authorInput} onChange={(e) => setAuthorInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAuthor() } }}
                                placeholder="e.g. Jay Patel"
                                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                            <button type="button" onClick={addAuthor} className="rounded-lg bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {form.authors.map((a) => (
                                <span key={a} onClick={() => setForm({ ...form, authors: form.authors.filter((x) => x !== a) })}
                                    className="cursor-pointer rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800">{a} ×</span>
                            ))}
                        </div>
                    </div>

                    <input required placeholder="Venue (e.g. IEEE Xplore)" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <select value={form.venueType} onChange={(e) => setForm({ ...form, venueType: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700">
                        {['Journal', 'Conference', 'Workshop', 'Preprint', 'Other'].map((t) => <option key={t}>{t}</option>)}
                    </select>

                    <input type="date" value={form.publicationDate} onChange={(e) => setForm({ ...form, publicationDate: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <textarea placeholder="Abstract" rows={3} value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <input placeholder="Paper URL (IEEE/arXiv link)" value={form.paperUrl} onChange={(e) => setForm({ ...form, paperUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    <input placeholder="DOI URL" value={form.doiUrl} onChange={(e) => setForm({ ...form, doiUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />

                    <div>
                        <label className="text-sm font-medium">Tags</label>
                        <div className="mt-1 flex gap-2">
                            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                                placeholder="e.g. NLP, RAG"
                                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                            <button type="button" onClick={addTag} className="rounded-lg bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {form.tags.map((t) => (
                                <span key={t} onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })}
                                    className="cursor-pointer rounded-full bg-slate-100 px-2.5 py-0.5 text-xs dark:bg-slate-800">{t} ×</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="pub-featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4" />
                        <label htmlFor="pub-featured" className="text-sm font-medium">Featured</label>
                    </div>

                    <button type="submit" className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
                        Save
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default AdminPublications