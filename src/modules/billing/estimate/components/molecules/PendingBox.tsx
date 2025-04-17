import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

import { ButtonDownloadEstimate } from '../atoms/ButtonDownloadEstimate'
import { ButtonPrintEstimate } from '../atoms/ButtonPrintEstimate'

export const PendingBox = () => {
    const { id } = useParams()
    const routeTenant = useRouteTenant()

    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <ButtonPrintEstimate className="flex-1" />
                <ButtonDownloadEstimate className="flex-1" />
            </div>
            <Button href={routeTenant.get(`/billing/estimate/${id}/email`)} className="flex-1" intent={'main'}>
                Envoyer par email
            </Button>
        </Box>
    )
}
