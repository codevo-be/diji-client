'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createMetaBatch } from 'services/meta'

export const useCreateMetaBatch = () => {
    return useMutation({
        mutationFn: createMetaBatch,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
