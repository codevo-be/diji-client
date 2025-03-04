import { useParams } from 'next/navigation'

import { Box, Button } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { ButtonDownloadInvoice } from './ButtonDownloadInvoice'
import { ButtonPrintInvoice } from './ButtonPrintInvoice'

export const PendingBox = () => {
    const { id } = useParams()

    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <ButtonPrintInvoice className="flex-1" />
                <ButtonDownloadInvoice className="flex-1" />
            </div>
            <Button href={getTenantUrl(`/billing/invoice/${id}/email`)} className="flex-1" intent={'main'}>
                Envoyer par email
            </Button>
        </Box>
    )
}
