import { Helmet } from 'react-helmet-async'

const SEO = ({ title, description, image, url }) => {
    const siteTitle = title ? `${title} | Jay's Portfolio` : "Jay's Portfolio"
    const desc = description || 'AI & Full Stack Developer building intelligent, scalable applications.'

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={url || window.location.href} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={desc} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:url" content={url || window.location.href} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={desc} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    )
}

export default SEO