import { useEffect, useState } from 'react'
import { UnsavedChangesContext } from './unsavedChanges'

export const UnsavedChangesProvider = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false)
    const [saveChanges, setSaveChanges] = useState(null)

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
        <UnsavedChangesContext.Provider value={{ isDirty, setIsDirty, saveChanges, setSaveChanges }}>
            {children}
        </UnsavedChangesContext.Provider>
    )
}
