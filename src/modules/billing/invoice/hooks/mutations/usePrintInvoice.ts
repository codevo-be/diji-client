'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { printInvoice } from '@billing/invoice/services/print-invoice'

export const usePrintInvoice = () => {
    return useMutation({
        mutationFn: printInvoice,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
