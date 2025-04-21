'use client'

import { useContext } from 'react'

import { TaskContext } from './TaskProvider'

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTask doit être utilisé dans AuthProvider')
    }
    return context
}
