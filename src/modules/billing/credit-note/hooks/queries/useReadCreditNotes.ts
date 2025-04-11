'use client'

import { useQuery } from '@tanstack/react-query'

import { readCreditNotes } from '@billing/credit-note/services'

export const useReadCreditNotes = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['credit-notes', { ...params }],
        queryFn: () => readCreditNotes(params),
        placeholderData: (previousData) => previousData
    })
}
