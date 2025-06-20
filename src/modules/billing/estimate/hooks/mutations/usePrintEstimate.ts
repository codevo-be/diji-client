'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { printEstimate } from '@billing/estimate/services/print-estimate'

export const usePrintEstimate = () => {
    return useMutation({
        mutationFn: printEstimate,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
