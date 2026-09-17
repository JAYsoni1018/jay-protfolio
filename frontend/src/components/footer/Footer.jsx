import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import * as Icons from 'lucide-react'
import { heroApi, socialLinksApi } from '../../services/resources'

const iconFor = (platform) => {
    const map = { GitHub: 'Github', LinkedIn: 'Linkedin', Email: 'Mail', Instagram: 'Instagram', 'X/Twitter': 'Twitter', YouTube: 'Youtube' }
    const Icon = Icons[map[platform]] || Icons.Link
    return Icon
}

const Footer = () => {
    const [hero, setHero] = useState(null)
    const [socials, setSocials] = useState([])

    useEffect(() => {
        heroApi.get().then((res) => setHero(res.data.data)).catch(() => { })
        socialLinksApi.getAll().then((res) => setSocials(res.data.data.filter((s) => s.isActive))).catch(() => { })
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="border-t border-slate-200 px-6 py-10 dark:border-slate-800">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="text-center sm:text-left">
                    <p className="text-lg font-bold">{hero?.name || 'Jay'}<span className="text-indigo-500">.</span></p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{hero?.tagline}</p>
                </div>

                <div className="flex items-center gap-3">
                    {socials
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((social) => {
                            const Icon = iconFor(social.platform)
                            return (
                                <a
                                    key={social._id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-slate-200 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                                    aria-label={social.platform}
                                >
                                    <Icon size={16} />
                                </a>
                            )
                        })}
                </div>

                <button
                    onClick={scrollToTop}
                    className="rounded-full border border-slate-200 p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    aria-label="Back to top"
                >
                    <ArrowUp size={16} />
                </button>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} {hero?.name || 'Jay'}. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer