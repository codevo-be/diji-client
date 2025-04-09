'use client'

import { useContext } from 'react'

import { AuthContext } from './AuthProvider'

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans AuthProvider')
    }
    return context
}
