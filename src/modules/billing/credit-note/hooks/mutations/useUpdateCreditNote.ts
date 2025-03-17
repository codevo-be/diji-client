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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes']
            })

            toast.success('La note de crédit à été modifiée !')
        }
    })
}
