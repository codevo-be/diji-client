'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjects } from '@task/services/taskProjects'

export const useReadProjects = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['task_projects', { ...params }],
        queryFn: () => readProjects(params)
    })
}
