import { useState, useCallback } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Upload, X, Star, GripVertical, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadApi } from '../../services/resources'

const SortableImage = ({ image, onDelete, onSetPrimary }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.publicId })
    const style = { transform: CSS.Transform.toString(transform), transition }

    return (
        <div ref={setNodeRef} style={style} className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img src={image.url} alt="" className="h-28 w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" {...attributes} {...listeners} className="rounded-full bg-white p-1.5 text-slate-900">
                    <GripVertical size={14} />
                </button>
                <button type="button" onClick={() => onSetPrimary(image.publicId)} className={`rounded-full p-1.5 ${image.isPrimary ? 'bg-amber-400' : 'bg-white text-slate-900'}`}>
                    <Star size={14} fill={image.isPrimary ? 'white' : 'none'} />
                </button>
                <button type="button" onClick={() => onDelete(image.publicId)} className="rounded-full bg-white p-1.5 text-red-500">
                    <X size={14} />
                </button>
            </div>
            {image.isPrimary && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-white">Primary</span>
            )}
        </div>
    )
}

const ImageUploader = ({ images, onChange, folder = 'projects' }) => {
    const [uploading, setUploading] = useState(false)

    const handleFiles = useCallback(async (files) => {
        setUploading(true)
        try {
            const uploads = await Promise.all(
                Array.from(files).map((file) => uploadApi.image(file, folder))
            )
            const newImages = uploads.map((res, i) => ({
                url: res.data.data.url,
                publicId: res.data.data.publicId,
                width: res.data.data.width,
                height: res.data.data.height,
                isPrimary: images.length === 0 && i === 0,
                order: images.length + i,
            }))
            onChange([...images, ...newImages])
            toast.success(`${newImages.length} image(s) uploaded`)
        } catch (err) {
            toast.error('Upload failed')
        } finally {
            setUploading(false)
        }
    }, [images, onChange, folder])

    const handleDelete = async (publicId) => {
        try {
            await uploadApi.deleteImage(publicId)
            onChange(images.filter((img) => img.publicId !== publicId))
        } catch {
            toast.error('Failed to delete image')
        }
    }

    const handleSetPrimary = (publicId) => {
        onChange(images.map((img) => ({ ...img, isPrimary: img.publicId === publicId })))
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return
        const oldIndex = images.findIndex((img) => img.publicId === active.id)
        const newIndex = images.findIndex((img) => img.publicId === over.id)
        const reordered = arrayMove(images, oldIndex, newIndex).map((img, i) => ({ ...img, order: i }))
        onChange(reordered)
    }

    return (
        <div>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-8 text-sm text-slate-500 transition hover:border-indigo-400 dark:border-slate-700">
                {uploading ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
                {uploading ? 'Uploading...' : 'Drag & drop images or click to browse'}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files.length && handleFiles(e.target.files)}
                />
            </label>

            {images.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={images.map((i) => i.publicId)} strategy={rectSortingStrategy}>
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {images.map((img) => (
                                <SortableImage key={img.publicId} image={img} onDelete={handleDelete} onSetPrimary={handleSetPrimary} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    )
}

export default ImageUploader