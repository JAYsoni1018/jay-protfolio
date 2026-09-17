import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {
    Bold, Italic, UnderlineIcon, List, ListOrdered, Quote, Code,
    Heading2, Link as LinkIcon,
} from 'lucide-react'

const ToolbarButton = ({ onClick, active, children, title }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`rounded-md p-2 transition ${active ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
    >
        {children}
    </button>
)

const RichTextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-indigo-500 underline' } }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'prose prose-sm dark:prose-invert max-w-none min-h-[200px] px-4 py-3 focus:outline-none',
            },
        },
    })

    if (!editor) return null

    const setLink = () => {
        const url = window.prompt('Enter URL')
        if (url) editor.chain().focus().setLink({ href: url }).run()
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700">
            <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800/50">
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                    <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                    <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading">
                    <Heading2 size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
                    <List size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
                    <ListOrdered size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
                    <Quote size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
                    <Code size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Link">
                    <LinkIcon size={16} />
                </ToolbarButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

export default RichTextEditor