'use client'

import { useQuery } from '@tanstack/react-query'

import { readCreditNoteItems } from '@billing/credit-note/services/item/read-credit-note-items'

export const useReadCreditNoteItems = (credit_note_id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['credit-note-items', { credit_note_id, ...params }],
        queryFn: () => readCreditNoteItems(credit_note_id, params)
    })
}
