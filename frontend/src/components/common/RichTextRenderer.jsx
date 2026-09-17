const RichTextRenderer = ({ html, className = '' }) => {
    if (!html) return null

    return (
        <div
            className={`prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-500 prose-code:text-indigo-500 ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

export default RichTextRenderer