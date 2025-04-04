'use client'

import { useQuery } from '@tanstack/react-query'

import { readColumns } from '@task/services'

export const useReadColumns = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['task_columns', { ...params }],
        queryFn: () => readColumns(id, params)
    })
}
