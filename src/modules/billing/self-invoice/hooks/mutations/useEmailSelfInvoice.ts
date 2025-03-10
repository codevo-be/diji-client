'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { emailSelfInvoice } from '@billing/self-invoice/services/email-self-invoice'

export const useEmailSelfInvoice = () => {
    return useMutation({
        mutationFn: emailSelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.message("l'email est envoyé !")
        }
    })
}
