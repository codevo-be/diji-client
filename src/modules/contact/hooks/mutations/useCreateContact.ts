'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createContact } from '@contact/services'

export const useCreateContact = () => {
    return useMutation({
        mutationFn: createContact,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['contacts']
            })
        }
    })
}
