'use client'

import { useQuery } from '@tanstack/react-query'

import { readMeta } from 'services/meta/read-meta'

export const useReadMeta = (key: string) => {
    return useQuery({
        queryKey: ['metas', { key }],
        queryFn: () => readMeta(key)
    })
}
