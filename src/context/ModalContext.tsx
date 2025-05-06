'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

const ModalContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
}>({
    open: false,
    setOpen: () => {}
})

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext)
