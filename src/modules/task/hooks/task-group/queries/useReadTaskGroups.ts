'use client'

import { useQuery } from '@tanstack/react-query'

import { readTaskGroups } from '@task/services/task-group/read-task-groups'

export const useReadTaskGroups = (project_id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['task-groups', { project_id, ...params }],
        queryFn: () => readTaskGroups(project_id, params)
    })
}
