'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import downloadBatchInvoices from '@billing/invoice/services/batch/download-batch-invoices'

export default function useDownloadBatchInvoices() {
    return useMutation({
        mutationFn: downloadBatchInvoices,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
