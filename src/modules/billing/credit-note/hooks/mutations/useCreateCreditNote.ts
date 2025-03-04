'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCreditNote } from '@billing/credit-note/services'

export const useCreateCreditNote = () => {
    return useMutation({
        mutationFn: createCreditNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes']
            })

            toast.success('La note de crédit a été créée !')
        }
    })
}
