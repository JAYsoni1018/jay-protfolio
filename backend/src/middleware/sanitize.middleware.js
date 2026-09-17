import sanitizeHtml from 'sanitize-html'

export const sanitizeRichText = (field) => (req, res, next) => {
    if (req.body[field]) {
        req.body[field] = sanitizeHtml(req.body[field], {
            allowedTags: [
                'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li',
                'blockquote', 'code', 'pre', 'a',
            ],
            allowedAttributes: { a: ['href', 'target', 'rel'] },
        })
    }
    next()
}