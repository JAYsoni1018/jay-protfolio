import { useEffect, useState } from 'react'
import { Upload, Download, Trash2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { uploadApi, heroApi } from '../../services/resources'
import { downloadFile, slugifyFilename } from '../../utils/downloadFile'
import ConfirmDialog from '../../components/admin/ConfirmDialog'

const publicIdFromUrl = (url) => {
    if (!url) return null
    const uploadMarker = '/upload/'
    const uploadIndex = url.indexOf(uploadMarker)
    if (uploadIndex === -1) return null
    return decodeURIComponent(url.slice(uploadIndex + uploadMarker.length).replace(/^v\d+\//, '').split('?')[0])
}

const AdminResume = () => {
    const [resumeUrl, setResumeUrl] = useState(null)
    const [publicId, setPublicId] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [ownerName, setOwnerName] = useState('Jay')
    const [uploading, setUploading] = useState(false)
    const [confirmId, setConfirmId] = useState(null)
    useEffect(() => {
        heroApi.get().then((res) => {
            const hero = res.data.data
            setOwnerName(hero.name || 'Jay')
            setResumeUrl(hero.resumeUrl || null)
            setPublicId(hero.resumePublicId || publicIdFromUrl(hero.resumeUrl))
            setFileName(hero.resumeFileName || null)
        }).catch(() => { })
    }, [])

    const handleUpload = async (file) => {
        setUploading(true)
        try {
            const res = await uploadApi.resume(file)
            setResumeUrl(res.data.data.url)
            setPublicId(res.data.data.publicId)
            setFileName(res.data.data.fileName)
            await heroApi.update({
                resumeUrl: res.data.data.url,
                resumePublicId: res.data.data.publicId,
                resumeFileName: res.data.data.fileName,
            })
            toast.success('Resume uploaded and linked to Hero section')
        } catch {
            toast.error('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async () => {
        if (!publicId) return
        try {
            await uploadApi.deleteResume(publicId)
            await heroApi.update({ resumeUrl: '', resumePublicId: '', resumeFileName: '' })
            setResumeUrl(null)
            setPublicId(null)
            setFileName(null)
            setConfirmId(null)
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
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium">{fileName || 'Current resume'}</p>
                                <p className="mt-1 text-xs text-slate-400">Resume uploaded and ready to download.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => downloadFile(resumeUrl, `jay-${slugifyFilename(ownerName)}-resume.pdf`)} aria-label="Download resume" title="Download resume" className="rounded-lg p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                                    <Download size={16} />
                                </button>
                                <button onClick={() => setConfirmId('resume')} aria-label="Delete resume" title="Delete resume" className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
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

            <ConfirmDialog
                open={!!confirmId}
                onClose={() => setConfirmId(null)}
                onConfirm={() => handleDelete(confirmId)}
                message="This resume will be permanently deleted."
            />
        </div>
    )
}

export default AdminResume