import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useDestroyInvoice, useUpdateInvoice } from '../hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

import { INVOICE_STATUS_PENDING } from '../data/invoice-statuses'

export const DraftBox = () => {
    const { id } = useParams()
    const router = useRouteTenant()

    const destroyInvoice = useDestroyInvoice()
    const updateInvoice = useUpdateInvoice()

    const onGenerateInvoice = () => {
        updateInvoice.mutate({
            id: Number(id),
            status: INVOICE_STATUS_PENDING
        })
    }

    const onDestroy = () => {
        destroyInvoice.mutate(Number(id), {
            onSuccess: () => {
                router.push(`/billing/invoice`)
            }
        })
    }

    return (
        <Box className="flex gap-4">
            <Button className="flex-1" onClick={onGenerateInvoice} isLoading={updateInvoice.isPending || updateInvoice.isSuccess}>
                Générer la facture
            </Button>
            <Button intent="error" className="flex-1" onClick={onDestroy} isLoading={destroyInvoice.isPending || destroyInvoice.isSuccess}>
                Supprimer
            </Button>
        </Box>
    )
}
