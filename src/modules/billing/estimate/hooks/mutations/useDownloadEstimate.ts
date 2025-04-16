'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { downloadEstimate } from '@billing/estimate/services/download-estimate'

export const useDownloadEstimate = () => {
    return useMutation({
        mutationFn: downloadEstimate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Le devis a été téléchargé !')
        }
    })
}
