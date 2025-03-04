'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { emailInvoice } from '@billing/invoice/services/email-invoice'

export const useEmailInvoice = () => {
    return useMutation({
        mutationFn: emailInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.message("l'email est envoyé !")
        }
    })
}
