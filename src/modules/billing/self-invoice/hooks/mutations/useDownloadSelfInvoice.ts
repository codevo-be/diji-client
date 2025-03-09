'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { downloadSelfInvoice } from '@billing/self-invoice/services/download-self-invoice'

export const useDownloadSelfInvoice = () => {
    return useMutation({
        mutationFn: downloadSelfInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('La facture a été téléchargée !')
        }
    })
}
