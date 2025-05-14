'use client'

import { createContext, useState } from 'react'

export const ModalContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    data: Record<string, any> | undefined
    setData: (data: any) => void
}>({
    open: false,
    setOpen: () => {},
    data: undefined,
    setData: () => {}
})

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()

    return <ModalContext.Provider value={{ data, setData, open, setOpen }}>{children}</ModalContext.Provider>
}
