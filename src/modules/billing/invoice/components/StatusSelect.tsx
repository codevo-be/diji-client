import { useParams } from 'next/navigation'

import { Box, Grid, SimpleSelect } from '@digico/ui'

import { useUpdateInvoice } from '../hooks/mutations'
import { useReadInvoice } from '../hooks/queries'

import { INVOICE_STATUS_DRAFT, INVOICE_STATUSES } from '../data/invoice-statuses'

export const StatusSelect = () => {
    const { id } = useParams()

    const { data } = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()

    const onChangeStatus = ({ value }: any) => {
        updateInvoice.mutate({
            id: Number(id),
            status: value
        })
    }

    if (!data || data?.status === INVOICE_STATUS_DRAFT) {
        return
    }

    return (
        <Grid.Col>
            <Box>
                <SimpleSelect label="Statut" defaultValue={INVOICE_STATUSES[data.status]} onChange={onChangeStatus} options={Object.values(INVOICE_STATUSES)} />
            </Box>
        </Grid.Col>
    )
}
