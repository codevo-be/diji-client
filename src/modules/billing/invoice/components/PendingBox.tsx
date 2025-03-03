import { Box, Button } from '@digico/ui'

import { ButtonDownloadInvoice } from './ButtonDownloadInvoice'

export const PendingBox = () => {
    return (
        <Box className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Button intent={'grey200'} className="flex-1" disabled={true}>
                    Imprimer
                </Button>
                <ButtonDownloadInvoice className="flex-1" />
            </div>
            <Button className="flex-1" intent={'main'} disabled={true}>
                Envoyer par email
            </Button>
        </Box>
    )
}
