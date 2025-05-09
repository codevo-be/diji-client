'use client'

import { useContext } from 'react'

import { ModalContext } from '@components/modal/ModalProvider'

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal doit être utilisé dans AuthProvider')
    }
    return context
}
