'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createPeppol } from '@contact/services/create-peppol'


export const useCreatePeppol = () => {
    return useMutation({
        mutationFn: createPeppol,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['peppol']
            })

            toast.success('Le contact a été créé !')
        }
    })
}
