'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createUpload } from 'services/upload'

export const useCreateUpload = () => {
    return useMutation({
        mutationFn: createUpload,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
