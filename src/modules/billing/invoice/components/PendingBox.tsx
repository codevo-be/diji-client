import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { ButtonSendToPeppol } from '@billing/invoice/components/ButtonSendToPeppol'
import { useRouteTenant } from 'helpers/route-tenant'

import { ButtonDownloadInvoice } from './ButtonDownloadInvoice'
import { ButtonPrintInvoice } from './ButtonPrintInvoice'

export const PendingBox = () => {
    const { id } = useParams()
    const routeTenant = useRouteTenant()

    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <ButtonPrintInvoice className="flex-1" />
                <ButtonDownloadInvoice className="flex-1" />
            </div>
            <ButtonSendToPeppol className="flex-1" />
            <Button href={routeTenant.get(`/billing/invoice/${id}/email`)} className="flex-1" intent={'main'}>
                Envoyer par email
            </Button>
        </Box>
    )
}
