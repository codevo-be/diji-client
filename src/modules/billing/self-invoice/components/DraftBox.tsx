import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useDestroySelfInvoice, useUpdateSelfInvoice } from '../hooks/mutations'

import { SELF_INVOICE_STATUS_PENDING } from '../data/self-invoice-statuses'

export const DraftBox = () => {
    const { id } = useParams()
    const router = useRouterWithTenant()

    const destroySelfInvoice = useDestroySelfInvoice()
    const updateSelfInvoice = useUpdateSelfInvoice()

    const onGenerateSelfInvoice = () => {
        updateSelfInvoice.mutate({
            id: Number(id),
            status: SELF_INVOICE_STATUS_PENDING
        })
    }

    const onDestroy = () => {
        destroySelfInvoice.mutate(Number(id), {
            onSuccess: () => {
                router.push(`/billing/self-invoice`)
            }
        })
    }

    return (
        <Box className="flex gap-4">
            <Button className="flex-1" onClick={onGenerateSelfInvoice} isLoading={updateSelfInvoice.isPending || updateSelfInvoice.isSuccess}>
                Générer la facture
            </Button>
            <Button intent="error" className="flex-1" onClick={onDestroy} isLoading={destroySelfInvoice.isPending || destroySelfInvoice.isSuccess}>
                Supprimer
            </Button>
        </Box>
    )
}
