'use client'

import { useQuery } from '@tanstack/react-query'

import { readSupplier } from '@tasks/services/supplier/read-supplier'

type Props = {
    with?: ['contacts']
}

export const useReadSupplier = (id: number, params?: Props) => {
    return useQuery({
        queryKey: ['suppliers', { id, ...params }],
        queryFn: () => readSupplier(id, params)
    })
}
