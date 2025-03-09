import { useParams } from 'next/navigation'

import { Grid, Tag } from '@digico/ui'

import { useReadSelfInvoice } from '../hooks/queries'

import { SELF_INVOICE_STATUSES } from '../data/self-invoice-statuses'

export const StatusBox = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    return (
        <Grid.Col className="flex ">
            <Tag className={`text-${SELF_INVOICE_STATUSES[data?.status ?? 'draft'].color}`}>{SELF_INVOICE_STATUSES[data?.status ?? 'draft'].label}</Tag>
        </Grid.Col>
    )
}
