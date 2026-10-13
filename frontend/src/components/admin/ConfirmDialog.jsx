import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Delete item?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    confirmClassName = 'bg-red-600 hover:bg-red-700',
    secondaryLabel,
    onSecondary,
    secondaryClassName = 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-500/10',
}) => (
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
            {secondaryLabel && (
                <button
                    onClick={onSecondary}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold ${secondaryClassName}`}
                >
                    {secondaryLabel}
                </button>
            )}
            <button
                onClick={onConfirm}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${confirmClassName}`}
            >
                {confirmLabel}
            </button>
        </div>
    </Modal>
)

export default ConfirmDialog