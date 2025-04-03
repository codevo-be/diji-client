'use client'

import { useQuery } from '@tanstack/react-query'

import { readTaskItem } from '@/modules/task/services/supplier/read-task-item'

type Props = {
    task_column_id: number
    page?: number
    search?: string
}

export const useReadTaskItem = (props: Props) => {
    return useQuery({
        queryKey: ['task-items', { ...props }],
        queryFn: () => readTaskItem(props),
    })
}
