'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { emailEstimate } from '@billing/estimate/services/email-estimate'

export const useEmailEstimate = () => {
    return useMutation({
        mutationFn: emailEstimate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.message("l'email est envoyé !")
        }
    })
}
