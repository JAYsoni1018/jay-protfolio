import { useEffect, useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { sectionsApi } from '../../services/resources'

const SortableSection = ({ section, onToggle }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section._id })
    const style = { transform: CSS.Transform.toString(transform), transition }

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
            <button {...attributes} {...listeners} className="cursor-grab text-slate-400"><GripVertical size={18} /></button>
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

    const load = () => sectionsApi.getAll().then((res) => setSections(res.data.data))
    useEffect(() => { load() }, [])

    const handleToggle = async (section) => {
        await sectionsApi.update(section._id, { enabled: !section.enabled })
        load()
        toast.success(`${section.title} ${!section.enabled ? 'enabled' : 'disabled'}`)
    }

    const handleDragEnd = async (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = sections.findIndex((s) => s._id === active.id)
        const newIndex = sections.findIndex((s) => s._id === over.id)
        const reordered = arrayMove(sections, oldIndex, newIndex)
        setSections(reordered)
        await sectionsApi.reorder(reordered.map((s, i) => ({ id: s._id, displayOrder: i })))
    }

    return (
        <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enable, disable, or reorder homepage sections.
            </p>

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
            </div>
        </div>
    )
}

export default AdminSettings