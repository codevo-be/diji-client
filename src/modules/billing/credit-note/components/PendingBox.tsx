import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

import { ButtonDownloadCreditNote } from './ButtonDownloadCreditNote'
import { ButtonPrintCreditNote } from './ButtonPrintCreditNote'

export const PendingBox = () => {
    const { id } = useParams()
    const routeTenant = useRouteTenant()

    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <ButtonPrintCreditNote className="flex-1" />
                <ButtonDownloadCreditNote className="flex-1" />
            </div>
            <Button href={routeTenant.get(`/billing/credit-note/${id}/email`)} className="flex-1" intent={'main'}>
                Envoyer par email
            </Button>
        </Box>
    )
}
