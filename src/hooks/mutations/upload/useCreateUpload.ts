'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createUpload } from 'services/upload'

export const useCreateUpload = () => {
    return useMutation({
        mutationFn: createUpload,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['uploads']
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
