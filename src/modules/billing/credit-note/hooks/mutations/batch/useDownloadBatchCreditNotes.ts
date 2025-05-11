'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import downloadBatchCreditNotes from '@billing/credit-note/services/batch/download-batch-credit-notes'

export default function useDownloadBatchCreditNotes() {
    return useMutation({
        mutationFn: downloadBatchCreditNotes,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
}