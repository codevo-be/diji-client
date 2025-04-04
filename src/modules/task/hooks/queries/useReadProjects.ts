'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjects } from '@task/services'

export const useReadProjects = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['projects', { ...params }],
        queryFn: () => readProjects(params)
    })
}
