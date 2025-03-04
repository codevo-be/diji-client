'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { downloadCreditNote } from '@billing/credit-note/services/download-credit-note'

export const useDownloadCreditNote = () => {
    return useMutation({
        mutationFn: downloadCreditNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('La note de crédit a été téléchargée !')
        }
    })
}
