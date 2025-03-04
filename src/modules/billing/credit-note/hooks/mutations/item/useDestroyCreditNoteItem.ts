'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyCreditNoteItem } from '@billing/credit-note/services'

export const useDestroyCreditNoteItem = () => {
    return useMutation({
        mutationFn: (data: { credit_note_id: number; id: number }) => destroyCreditNoteItem(data.credit_note_id, data.id),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-note-items']
            })

            toast.success('La ligne a été supprimée !')
        }
    })
}
