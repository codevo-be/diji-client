'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { downloadInvoice } from '@billing/invoice/services/download-invoice'

export const useDownloadInvoice = () => {
    return useMutation({
        mutationFn: downloadInvoice,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('La facture a été téléchargée !')
        }
    })
}
