'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjectReports } from '../../services/read-project-reports'

type Props = {
    with?: ['user']
    page?: number
    search?: string
}

export const useReadProjectReports = (project_id: number, props?: Props) => {
    return useQuery({
        queryKey: ['project-reports', { ...props }],
        queryFn: () => readProjectReports(project_id, props)
    })
}
