import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import ScrollReveal from '../common/ScrollReveal'
import { contactApi } from '../../services/resources'

const initialForm = { name: '', email: '', subject: '', message: '' }

const validate = (form) => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email'
    if (!form.subject.trim()) errors.subject = 'Subject is required'
    if (!form.message.trim()) errors.message = 'Message is required'
    else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters'
    return errors
}

const Contact = () => {
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: undefined })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate(form)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setSubmitting(true)
        try {
            await contactApi.submit(form)
            toast.success('Message sent successfully!')
            setForm(initialForm)
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send message. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'subject', label: 'Subject', type: 'text' },
    ]

    return (
        <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
            <ScrollReveal>
                <h2 className="text-center text-3xl font-bold sm:text-4xl">
                    Get In <span className="text-indigo-500">Touch</span>
                </h2>
                <p className="mt-3 text-center text-slate-500 dark:text-slate-400">
                    Have a project in mind or just want to say hi? Send a message.
                </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {fields.slice(0, 2).map((field) => (
                            <div key={field.name}>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.label}
                                    className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${errors[field.name] ? 'border-red-400' : 'border-slate-300 dark:border-slate-700'
                                        }`}
                                />
                                {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
                            </div>
                        ))}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            className={`w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${errors.subject ? 'border-red-400' : 'border-slate-300 dark:border-slate-700'
                                }`}
                        />
                        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                    </div>

                    <div>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            rows={5}
                            className={`w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${errors.message ? 'border-red-400' : 'border-slate-300 dark:border-slate-700'
                                }`}
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={submitting}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
                        {submitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </form>
            </ScrollReveal>
        </section>
    )
}

export default Contact