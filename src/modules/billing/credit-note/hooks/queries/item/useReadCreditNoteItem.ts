'use client'

import { useQuery } from '@tanstack/react-query'

import { readCreditNoteItem } from '@billing/credit-note/services/item/read-credit-note-item'

export const useReadCreditNoteItem = (credit_note_id: number, id: number, params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['credit-note-items', { credit_note_id, id, ...params }],
        queryFn: () => readCreditNoteItem(credit_note_id, id, params)
    })
}
