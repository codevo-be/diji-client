'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjectSteps } from '../../services/read-project-steps'

type Props = {
    with?: []
    page?: number
    search?: string
}

export const useReadProjectSteps = (project_id: number, props?: Props) => {
    return useQuery({
        queryKey: ['project-steps', { ...props }],
        queryFn: () => readProjectSteps(project_id, props)
    })
}
