'use client'

import { useQuery } from '@tanstack/react-query'

import { readMetas } from 'services/meta/read-metas'

export const useReadMetas = (keys: string[]) => {
    return useQuery({
        queryKey: ['metas', { keys }],
        queryFn: () => readMetas(keys)
    })
}
