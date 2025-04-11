'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { sendToPeppol } from '@billing/credit-note/services/send-to-peppol'


export const useSendToPeppol = () => {
    return useMutation({
        mutationFn: sendToPeppol,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('La facture a été envoyée via Peppol !')
        }
    })
}
