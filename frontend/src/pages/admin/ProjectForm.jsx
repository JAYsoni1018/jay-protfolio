import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Save, Loader2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import RichTextEditor from '../../components/admin/RichTextEditor'
import ImageUploader from '../../components/admin/ImageUploader'
import { projectsApi } from '../../services/resources'

const emptyProject = {
    title: '', slug: '', shortDescription: '', fullDescription: '',
    technologies: [], category: '', githubUrl: '', liveDemoUrl: '',
    featured: false, displayOrder: 0, images: [],
}

const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')

const ProjectForm = () => {
    const { id } = useParams()
    const isEdit = id && id !== 'new'
    const navigate = useNavigate()

    const [form, setForm] = useState(emptyProject)
    const [techInput, setTechInput] = useState('')
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(isEdit)

    useEffect(() => {
        if (isEdit) {
            projectsApi.getOne(id).then((res) => setForm(res.data.data)).finally(() => setLoading(false))
        }
    }, [id, isEdit])

    const handleTitleChange = (title) => {
        setForm((f) => ({ ...f, title, slug: isEdit ? f.slug : slugify(title) }))
    }

    const addTech = () => {
        if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
            setForm((f) => ({ ...f, technologies: [...f.technologies, techInput.trim()] }))
            setTechInput('')
        }
    }

    const removeTech = (tech) => {
        setForm((f) => ({ ...f, technologies: f.technologies.filter((t) => t !== tech) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const payload = { ...form, thumbnail: form.images.find((i) => i.isPrimary) || form.images[0] }
            if (isEdit) {
                await projectsApi.update(id, payload)
                toast.success('Project updated')
            } else {
                await projectsApi.create(payload)
                toast.success('Project created')
            }
            navigate('/admin/projects')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save project')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex h-64 items-center justify-center">Loading...</div>

    return (
        <div className="mx-auto max-w-3xl">
            <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-500">
                <ArrowLeft size={16} /> Back to projects
            </Link>

            <h1 className="mt-3 text-2xl font-bold">{isEdit ? 'Edit Project' : 'Add Project'}</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label className="text-sm font-medium">Project Title</label>
                    <input
                        required
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Slug</label>
                    <input
                        required
                        value={form.slug}
                        onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Short Description</label>
                    <textarea
                        required
                        rows={2}
                        value={form.shortDescription}
                        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Project Images</label>
                    <div className="mt-1">
                        <ImageUploader images={form.images} onChange={(images) => setForm({ ...form, images })} folder="projects" />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Technologies</label>
                    <div className="mt-1 flex gap-2">
                        <input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }}
                            placeholder="e.g. React"
                            className="flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                        />
                        <button type="button" onClick={addTech} className="rounded-xl bg-slate-100 px-4 text-sm font-medium dark:bg-slate-800">Add</button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {form.technologies.map((tech) => (
                            <span key={tech} onClick={() => removeTech(tech)} className="cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                {tech} ×
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Category</label>
                        <input
                            required
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            placeholder="e.g. Full Stack, AI/ML"
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                        />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={form.featured}
                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                            className="h-4 w-4"
                        />
                        <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input
                            value={form.githubUrl}
                            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Live Demo URL</label>
                        <input
                            value={form.liveDemoUrl}
                            onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Full Description (rich text)</label>
                    <div className="mt-1">
                        <RichTextEditor value={form.fullDescription} onChange={(html) => setForm({ ...form, fullDescription: html })} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Project'}
                </button>
            </form>
        </div>
    )
}

export default ProjectForm