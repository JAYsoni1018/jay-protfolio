export const formatDate = (date, options = { year: 'numeric', month: 'short' }) => {
    if (!date) return 'Present'
    return new Date(date).toLocaleDateString('en-US', options)
}

export const formatDateRange = (start, end, isCurrent = false) => {
    const startStr = formatDate(start)
    const endStr = isCurrent ? 'Present' : formatDate(end)
    return `${startStr} — ${endStr}`
}