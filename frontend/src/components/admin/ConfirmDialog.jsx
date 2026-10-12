import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

const ConfirmDialog = ({ open, onClose, onConfirm, title = 'Delete item?', message = 'This action cannot be undone.' }) => (
    <Modal open={open} onClose={onClose} title={title}>
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <AlertTriangle size={20} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
            <button
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
                Cancel
            </button>
            <button
                onClick={onConfirm}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    </Modal>
)

export default ConfirmDialog