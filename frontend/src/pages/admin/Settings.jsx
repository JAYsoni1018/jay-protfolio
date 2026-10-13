import { useCallback, useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Loader2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { sectionsApi } from '../../services/resources'
import { useUnsavedChanges } from '../../context/unsavedChanges'

const FIXED_FIRST = ['hero', 'about']
const FIXED_LAST = 'contact'

const orderSections = (items) => {
    const first = FIXED_FIRST.map((key) => items.find((section) => section.sectionKey === key)).filter(Boolean)
    const middle = items.filter((section) => !FIXED_FIRST.includes(section.sectionKey) && section.sectionKey !== FIXED_LAST)
    const last = items.find((section) => section.sectionKey === FIXED_LAST)
    return [...first, ...middle, ...(last ? [last] : [])]
}

const SortableSection = ({ section, onToggle }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section._id })
    const style = { transform: CSS.Transform.toString(transform), transition }
    const isFixed = FIXED_FIRST.includes(section.sectionKey) || section.sectionKey === FIXED_LAST

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <button {...attributes} {...listeners} disabled={isFixed} className={`text-slate-400 ${isFixed ? 'cursor-not-allowed opacity-40' : 'cursor-grab'}`}><GripVertical size={18} /></button>
            <span className="flex-1 text-sm font-medium">{section.title}</span>
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" checked={section.enabled} onChange={() => onToggle(section)} className="peer sr-only" />
                <div className="h-5 w-9 rounded-full bg-slate-300 transition peer-checked:bg-indigo-600 dark:bg-slate-700" />
                <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4" />
            </label>
        </div>
    )
}

const AdminSettings = () => {
    const [sections, setSections] = useState([])
    const [skillsMode, setSkillsMode] = useState('progress')
    const [saving, setSaving] = useState(false)
    const { setIsDirty, setSaveChanges } = useUnsavedChanges()


    const load = () => {
        sectionsApi.getAll().then((res) => {
            setSections(orderSections([...res.data.data].sort((a, b) => a.displayOrder - b.displayOrder)))
            const skillsSection = res.data.data.find((s) => s.sectionKey === 'skills')
            if (skillsSection) setSkillsMode(skillsSection.skillsDisplayMode || 'progress')
        })
    }
    useEffect(() => { load() }, [])
    useEffect(() => () => setIsDirty(false), [setIsDirty])

    const markDirty = () => setIsDirty(true)

    const handleSkillsModeChange = (mode) => {
        setSkillsMode(mode)
        markDirty()
    }
    const handleToggle = (section) => {
        setSections((current) => current.map((item) => item._id === section._id ? { ...item, enabled: !item.enabled } : item))
        markDirty()
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const activeSection = sections.find((section) => section._id === active.id)
        const overSection = sections.find((section) => section._id === over.id)
        if (!activeSection || !overSection || FIXED_FIRST.includes(activeSection.sectionKey) || FIXED_FIRST.includes(overSection.sectionKey) || activeSection.sectionKey === FIXED_LAST || overSection.sectionKey === FIXED_LAST) return
        const oldIndex = sections.findIndex((s) => s._id === active.id)
        const newIndex = sections.findIndex((s) => s._id === over.id)
        const reordered = orderSections(arrayMove(sections, oldIndex, newIndex))
        setSections(reordered)
        markDirty()
    }

    const handleSave = useCallback(async () => {
        setSaving(true)
        try {
            const ordered = orderSections(sections)
            const skillsSection = ordered.find((section) => section.sectionKey === 'skills')
            await Promise.all([
                ...ordered.map((section) => sectionsApi.update(section._id, { enabled: section.enabled })),
                sectionsApi.reorder(ordered.map((section, index) => ({ id: section._id, displayOrder: index }))),
                ...(skillsSection ? [sectionsApi.update(skillsSection._id, { skillsDisplayMode: skillsMode })] : []),
            ])
            setSections(ordered.map((section, index) => ({ ...section, displayOrder: index })))
            setIsDirty(false)
            toast.success('Settings saved')
            return true
        } catch {
            toast.error('Failed to save settings')
            return false
        } finally {
            setSaving(false)
        }
    }, [sections, skillsMode, setIsDirty])

    useEffect(() => {
        setSaveChanges(() => handleSave)
        return () => setSaveChanges(null)
    }, [handleSave, setSaveChanges])

    return (
        <div className="mx-auto max-w-xl">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Enable, disable, or reorder homepage sections.
                    </p>
                </div>
                <button onClick={handleSave} disabled={!sections.length || saving} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="mt-6">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={sections.map((s) => s._id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                            {sections.map((section) => (
                                <SortableSection key={section._id} section={section} onToggle={handleToggle} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
                <div className="mt-8 rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                    <h2 className="text-sm font-semibold">Skills Section Display</h2>
                    <p className="mt-1 text-xs text-slate-400">Choose how skills appear on the public site.</p>
                    <div className="mt-3 inline-flex rounded-full border border-slate-200 p-1 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => handleSkillsModeChange('progress')}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${skillsMode === 'progress' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                        >
                            Progress Bars
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSkillsModeChange('badges')}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${skillsMode === 'badges' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
                        >
                            Badges
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSettings