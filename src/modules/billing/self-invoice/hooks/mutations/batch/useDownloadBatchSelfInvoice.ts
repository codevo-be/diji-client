'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import downloadBachSelfInvoice from '@billing/self-invoice/services/batch/download-bach-self-invoice'

export default function useDownloadBatchSelfInvoice() {
    return useMutation({
        mutationFn: downloadBachSelfInvoice,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
}