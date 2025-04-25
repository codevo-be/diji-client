'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import downloadBatchCreditNotes from '@billing/credit-note/services/batch/download-batch-credit-notes'

export default function useDownloadBatchCreditNotes() {
    return useMutation({
        mutationFn: downloadBatchCreditNotes,
        onSuccess: (data) => {
            console.log(data);

            toast.success(data.message);

            if (data.skipped.length > 0) {
                toast.error(
                    'Certaines notes de crédit n\'ont pas pu être téléchargées : ' +
                        data.skipped.map((item: number) => String(item)).join(', ')
                )
            }
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })
}