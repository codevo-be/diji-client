'use client'

import { useQuery } from '@tanstack/react-query'

import { readProject } from '../../services/read-project'

type Props = {
    with?: []
}

export const useReadProject = (id: number, params?: Props) => {
    return useQuery({
        queryKey: ['projects', { id, ...params }],
        queryFn: () => readProject(id, params)
    })
}
