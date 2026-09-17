import { useState } from 'react'
import { Upload, Download, Trash2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadApi, heroApi } from '../../services/resources'

const AdminResume = () => {
    const [resumeUrl, setResumeUrl] = useState(null)
    const [publicId, setPublicId] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (file) => {
        setUploading(true)
        try {
            const res = await uploadApi.resume(file)
            setResumeUrl(res.data.data.url)
            setPublicId(res.data.data.publicId)
            await heroApi.update({ resumeUrl: res.data.data.url })
            toast.success('Resume uploaded and linked to Hero section')
        } catch {
            toast.error('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!publicId) return
        if (!window.confirm('Remove current resume?')) return
        try {
            await uploadApi.deleteImage(publicId)
            await heroApi.update({ resumeUrl: '' })
            setResumeUrl(null)
            setPublicId(null)
            toast.success('Resume removed')
        } catch {
            toast.error('Failed to remove')
        }
    }

    return (
        <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-bold">Resume</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Upload your resume PDF — it links automatically to the Hero section's download button.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
                {resumeUrl ? (
                    <div className="flex items-center justify-between">
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-500 hover:underline">
                            <Download size={16} /> View current resume
                        </a>
                        <button onClick={handleDelete} className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-slate-400">No resume uploaded yet.</p>
                )}

                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 py-8 text-sm text-slate-500 transition hover:border-indigo-400 dark:border-slate-700">
                    {uploading ? <Loader2 size={22} className="animate-spin" /> : <Upload size={22} />}
                    {uploading ? 'Uploading...' : 'Upload / Replace Resume (PDF)'}
                    <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files[0] && handleUpload(e.target.files[0])} />
                </label>
            </div>
        </div>
    )
}

export default AdminResume