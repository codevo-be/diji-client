'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateCreditNoteItem } from '@billing/credit-note/services'

export const useUpdateCreditNoteItem = () => {
    return useMutation({
        mutationFn: updateCreditNoteItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['credit-note-items', { credit_note_id: Number(variables.credit_note_id) }]
            })

            queryClient.invalidateQueries({
                queryKey: ['credit-notes', { id: Number(variables.credit_note_id) }]
            })

            toast.success('La ligne à été modifiée !')
        }
    })
}
