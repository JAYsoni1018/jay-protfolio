import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Save, Loader2 } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'
import { heroApi } from '../../services/resources'

const emptyHero = {
    name: '', title: '', tagline: '', introduction: '',
    githubUrl: '', linkedinUrl: '', resumeUrl: '', profilePhoto: null,
}

const HeroEditor = () => {
    const [form, setForm] = useState(emptyHero)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        heroApi.get().then((res) => { if (res.data.data) setForm(res.data.data) }).finally(() => setLoading(false))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            await heroApi.update(form)
            toast.success('Hero section updated')
        } catch {
            toast.error('Failed to save')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex h-64 items-center justify-center">Loading...</div>

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold">Hero Section</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label className="text-sm font-medium">Profile Photo</label>
                    <div className="mt-1">
                        <ImageUploader
                            images={form.profilePhoto ? [{ ...form.profilePhoto, isPrimary: true }] : []}
                            onChange={(images) => setForm({ ...form, profilePhoto: images[0] || null })}
                            folder="hero"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Professional Title</label>
                    <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="AI & Full Stack Developer"
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Tagline</label>
                    <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Introduction</label>
                    <textarea rows={3} value={form.introduction} onChange={(e) => setForm({ ...form, introduction: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">LinkedIn URL</label>
                        <input value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                    </div>
                </div>

                <button type="submit" disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Hero Section'}
                </button>
            </form>
        </div>
    )
}

export default HeroEditor