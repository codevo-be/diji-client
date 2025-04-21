'use client'

import { useQuery } from '@tanstack/react-query'

import { readProject } from '@project/services/read-project'

export const useReadProject = (id: number) => {
    return useQuery({
        queryKey: ['projects', { id }],
        queryFn: () => readProject(id)
    })
}
