import { useEffect, useState } from 'react'
import { UnsavedChangesContext } from './unsavedChanges'

export const UnsavedChangesProvider = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false)

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!isDirty) return
            event.preventDefault()
            event.returnValue = ''
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [isDirty])

    return (
        <UnsavedChangesContext.Provider value={{ isDirty, setIsDirty }}>
            {children}
        </UnsavedChangesContext.Provider>
    )
}
