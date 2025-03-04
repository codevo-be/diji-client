import { useParams } from 'next/navigation'

import { Grid, Tag } from '@digico/ui'

import { useReadInvoice } from '../hooks/queries'

import { INVOICE_STATUSES } from '../data/invoice-statuses'

export const StatusBox = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    return (
        <Grid.Col className="flex ">
            <Tag className={`text-${INVOICE_STATUSES[data?.status ?? 'draft'].color}`}>{INVOICE_STATUSES[data?.status ?? 'draft'].label}</Tag>
        </Grid.Col>
    )
}
