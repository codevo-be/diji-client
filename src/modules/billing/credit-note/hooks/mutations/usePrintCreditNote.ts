'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { printCreditNote } from '@billing/credit-note/services/print-credit-note'

export const usePrintCreditNote = () => {
    return useMutation({
        mutationFn: printCreditNote,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
