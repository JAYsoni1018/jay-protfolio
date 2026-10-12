import { createContext, useContext } from "react";

export const UnsavedChangesContext = createContext(null);

export const useUnsavedChanges = () => useContext(UnsavedChangesContext);
