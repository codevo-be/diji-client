'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { printSelfInvoice } from '@billing/self-invoice/services/print-self-invoice'

export const usePrintSelfInvoice = () => {
    return useMutation({
        mutationFn: printSelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
