'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { emailCreditNote } from '@billing/credit-note/services/email-credit-note'

export const useEmailCreditNote = () => {
    return useMutation({
        mutationFn: emailCreditNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.message("l'email est envoyé !")
        }
    })
}
