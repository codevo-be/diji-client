'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateContact } from '@contact/services'

export const useUpdateContact = () => {
    return useMutation({
        mutationFn: updateContact,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['contacts', { id: variables.id }]
            })
            toast.success('Le contact a été modifié !')
        }
    })
}
