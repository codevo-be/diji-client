'use client'

import { useParams } from 'next/navigation'

import { Table } from '@digico/ui'
import { formatCurrency } from '@digico/utils'

import { useReadInvoiceItems } from '@billing/invoice/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

type Props = {
    className?: string
}

export const CreditNoteItemList = ({ className = '' }: Props) => {
    const { id: invoice_id } = useParams()

    const queryInvoiceItem = useReadInvoiceItems(Number(invoice_id))

    return (
        <Table className={className} items={queryInvoiceItem.data?.data ?? []}>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Qte</Table.Head>
            <Table.Head>Prix U. HT</Table.Head>
            <Table.Head>TVA</Table.Head>
            <Table.Head>Total HT</Table.Head>
            <Table.Col name="name" />
            <Table.Col name="quantity" />
            <Table.Col>
                {(item) => {
                    if (!item.retail) {
                        return ''
                    }
                    return formatCurrency(item.retail.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(item: BillingItemType) => {
                    return `${item.vat}%`
                }}
            </Table.Col>
            <Table.Col>
                {(item: any) => {
                    if (!item.quantity) {
                        return ''
                    }

                    return formatCurrency(item.quantity * (item.retail?.subtotal ?? 0))
                }}
            </Table.Col>
        </Table>
    )
}
