'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyCreditNote } from '@billing/credit-note/services'

export const useDestroyCreditNote = () => {
    return useMutation({
        mutationFn: destroyCreditNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['credit-notes']
            })

            toast.success('La note de crédit a été supprimée !')
        }
    })
}
