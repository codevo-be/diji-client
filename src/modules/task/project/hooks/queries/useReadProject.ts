'use client'

import { useQuery } from '@tanstack/react-query'

import { readProject } from '@task/services/taskProjects/read-project'

export const useReadProject = (id: number) => {
    return useQuery({
        queryKey: ['task_projects', { id }],
        queryFn: () => readProject(id)
    })
}
