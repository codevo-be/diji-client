import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useReadEstimate } from '@billing/estimate/hooks/queries'
import { useCreateInvoice } from '@billing/invoice/hooks/mutations'

import { useRouteTenant } from 'helpers/route-tenant'

export const ValidateBox = () => {
    const { id } = useParams()
    const routerTenant = useRouteTenant()

    const { data, isSuccess } = useReadEstimate(Number(id), {
        include: ['items']
    })

    const createInvoice = useCreateInvoice()

    const onCreateInvoice = () => {
        createInvoice.mutate(
            {
                issuer: data?.issuer,
                recipient: data?.recipient,
                contact_id: data?.contact_id,
                items: data?.items
            },
            {
                onSuccess: ({ data }) => {
                    routerTenant.push(`/billing/invoice/${data.id}`)
                }
            }
        )
    }

    if (!isSuccess) {
        return null
    }

    return (
        <Box className="flex gap-4">
            <Button isLoading={createInvoice.isPending} intent="grey200" className="flex-1" onClick={onCreateInvoice}>
                Créer une facture
            </Button>
        </Box>
    )
}
