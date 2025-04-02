'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCreditNoteItem } from '@billing/credit-note/services'

export const useCreateCreditNoteItem = () => {
    return useMutation({
        mutationFn: createCreditNoteItem,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['credit-note-items']
            })

            queryClient.invalidateQueries({
                queryKey: ['credit-notes', { id: Number(variables.credit_note_id) }]
            })

            toast.success('La ligne a été créée !')
        }
    })
}
