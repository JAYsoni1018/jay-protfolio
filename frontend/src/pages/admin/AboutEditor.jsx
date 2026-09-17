import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Save, Loader2, Plus, X } from 'lucide-react'
import ImageUploader from '../../components/admin/ImageUploader'
import { aboutApi } from '../../services/resources'

const emptyAbout = {
    biography: '', professionalSummary: '', interests: [], careerFocus: '', stats: [], profileImage: null,
}

const AboutEditor = () => {
    const [form, setForm] = useState(emptyAbout)
    const [interestInput, setInterestInput] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        aboutApi.get().then((res) => { if (res.data.data) setForm(res.data.data) }).finally(() => setLoading(false))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            await aboutApi.update(form)
            toast.success('About section updated')
        } catch {
            toast.error('Failed to save')
        } finally {
            setSaving(false)
        }
    }

    const addInterest = () => {
        if (interestInput.trim()) {
            setForm({ ...form, interests: [...form.interests, interestInput.trim()] })
            setInterestInput('')
        }
    }

    const addStat = () => {
        setForm({ ...form, stats: [...form.stats, { label: '', value: '', order: form.stats.length }] })
    }

    const updateStat = (i, field, value) => {
        const stats = [...form.stats]
        stats[i][field] = value
        setForm({ ...form, stats })
    }

    const removeStat = (i) => {
        setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) })
    }

    if (loading) return <div className="flex h-64 items-center justify-center">Loading...</div>

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold">About Section</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label className="text-sm font-medium">Profile Image</label>
                    <div className="mt-1">
                        <ImageUploader
                            images={form.profileImage ? [{ ...form.profileImage, isPrimary: true }] : []}
                            onChange={(images) => setForm({ ...form, profileImage: images[0] || null })}
                            folder="about"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Biography</label>
                    <textarea rows={3} value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Professional Summary</label>
                    <textarea rows={3} value={form.professionalSummary} onChange={(e) => setForm({ ...form, professionalSummary: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Career Focus</label>
                    <input value={form.careerFocus} onChange={(e) => setForm({ ...form, careerFocus: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                </div>

                <div>
                    <label className="text-sm font-medium">Interests</label>
                    <div className="mt-1 flex gap-2">
                        <input value={interestInput} onChange={(e) => setInterestInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterest() } }}
                            className="flex-1 rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                        <button type="button" onClick={addInterest} className="rounded-xl bg-slate-100 px-4 text-sm dark:bg-slate-800">Add</button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {form.interests.map((i) => (
                            <span key={i} onClick={() => setForm({ ...form, interests: form.interests.filter((x) => x !== i) })}
                                className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800">{i} ×</span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Statistics</label>
                        <button type="button" onClick={addStat} className="inline-flex items-center gap-1 text-sm text-indigo-500">
                            <Plus size={14} /> Add Stat
                        </button>
                    </div>
                    <div className="mt-2 space-y-2">
                        {form.stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <input placeholder="Label (Projects Completed)" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)}
                                    className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                                <input placeholder="Value (12+)" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)}
                                    className="w-28 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700" />
                                <button type="button" onClick={() => removeStat(i)} className="text-red-500"><X size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save About Section'}
                </button>
            </form>
        </div>
    )
}

export default AboutEditor