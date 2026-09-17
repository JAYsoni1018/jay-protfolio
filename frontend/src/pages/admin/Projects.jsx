import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, Pencil, Trash2, GripVertical, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { projectsApi } from '../../services/resources'

const SortableRow = ({ project, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project._id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <button {...attributes} {...listeners} className="cursor-grab text-slate-400">
        <GripVertical size={18} />
      </button>
      <img src={project.thumbnail?.url || project.images?.[0]?.url} alt="" className="h-10 w-10 rounded-lg object-cover bg-slate-100" />
      <div className="flex-1">
        <p className="text-sm font-medium">{project.title}</p>
        <p className="text-xs text-slate-400">{project.category}</p>
      </div>
      {project.featured && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">Featured</span>}
      <Link to={`/admin/projects/${project._id}`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
        <Pencil size={16} />
      </Link>
      <button onClick={() => onDelete(project._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
        <Trash2 size={16} />
      </button>
    </div>
  )
}

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    projectsApi.getAll({ limit: 200 }).then((res) => setProjects(res.data.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await projectsApi.remove(id)
      toast.success('Project deleted')
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = projects.findIndex((p) => p._id === active.id)
    const newIndex = projects.findIndex((p) => p._id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)
    setProjects(reordered)
    await projectsApi.reorder(reordered.map((p, i) => ({ id: p._id, displayOrder: i })))
  }

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <div className="flex h-64 items-center justify-center">Loading...</div>

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link to="/admin/projects/new" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      <div className="relative mt-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-slate-300 bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">No projects found.</p>
      ) : (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((p) => p._id)} strategy={verticalListSortingStrategy}>
            <div className="mt-6 space-y-2">
              {filtered.map((project) => (
                <SortableRow key={project._id} project={project} onDelete={handleDelete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

export default AdminProjects