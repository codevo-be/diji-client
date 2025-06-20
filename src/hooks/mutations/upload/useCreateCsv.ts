'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCsv } from 'services/upload/create-csv'

export const useCreateCsv = () => {
    return useMutation({
        mutationFn: createCsv,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
