import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useDestroyCreditNote, useUpdateCreditNote } from '../hooks/mutations'

import { CREDIT_NOTE_STATUS_PENDING } from '../data/credit-note-statuses'

export const DraftBox = () => {
    const { id } = useParams()
    const router = useRouterWithTenant()

    const destroyCreditNote = useDestroyCreditNote()
    const updateCreditNote = useUpdateCreditNote()

    const onGenerateInvoice = () => {
        updateCreditNote.mutate({
            id: Number(id),
            status: CREDIT_NOTE_STATUS_PENDING
        })
    }

    const onDestroy = () => {
        destroyCreditNote.mutate(Number(id), {
            onSuccess: () => {
                router.push(`/billing/credit-note`)
            }
        })
    }

    return (
        <Box className="flex gap-4">
            <Button className="flex-1" onClick={onGenerateInvoice} isLoading={updateCreditNote.isPending || updateCreditNote.isSuccess}>
                Générer la note de crédit
            </Button>
            <Button intent="error" className="flex-1" onClick={onDestroy} isLoading={destroyCreditNote.isPending || destroyCreditNote.isSuccess}>
                Supprimer
            </Button>
        </Box>
    )
}
