'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjectHistory } from '../../services/read-project-history'

export const useReadProjectHistory = (project_id: number) => {
    return useQuery({
        queryKey: ['project-history', { project_id: project_id }],
        queryFn: () => readProjectHistory(project_id)
    })
}
