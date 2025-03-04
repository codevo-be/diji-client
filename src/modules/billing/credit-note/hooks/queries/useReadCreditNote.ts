'use client'

import { useQuery } from '@tanstack/react-query'

import { readCreditNote } from '@billing/credit-note/services'

export const useReadCreditNote = (id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['credit-notes', { id, ...params }],
        queryFn: () => readCreditNote(id, params)
    })
}
