'use client'

import { useQuery } from '@tanstack/react-query'

import { readTaskColumn } from '@/modules/task/services/supplier/read-task-column'

type Props = {
    with?: ['contacts']
    page?: number
    search?: string
}

export const useReadTaskColumn = (props?: Props) => {
    return useQuery({
        queryKey: ['task-columns', { ...props }],
        queryFn: () => readTaskColumn(props)
    })
}
