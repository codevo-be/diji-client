'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyContact } from '@contact/services'

export const useDestroyContact = () => {
    return useMutation({
        mutationFn: destroyContact,
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
