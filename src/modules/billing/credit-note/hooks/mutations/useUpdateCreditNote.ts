'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateCreditNote } from '@billing/credit-note/services'

export const useUpdateCreditNote = () => {
    return useMutation({
        mutationFn: updateCreditNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes', { id: variables.id }]
            })

            toast.success('La note de crédit à été modifiée !')
        }
    })
}
