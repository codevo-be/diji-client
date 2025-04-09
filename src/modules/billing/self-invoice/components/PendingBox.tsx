import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

import { ButtonDownloadSelfInvoice } from './ButtonDownloadSelfInvoice'
import { ButtonPrintSelfInvoice } from './ButtonPrintSelfInvoice'

export const PendingBox = () => {
    const { id } = useParams()
    const routeTenant = useRouteTenant()

    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <ButtonPrintSelfInvoice className="flex-1" />
                <ButtonDownloadSelfInvoice className="flex-1" />
            </div>
            <Button href={routeTenant.get(`/billing/self-invoice/${id}/email`)} className="flex-1" intent={'main'}>
                Envoyer par email
            </Button>
        </Box>
    )
}
