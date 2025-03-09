'use client'

import { useParams } from 'next/navigation'

import { Table } from '@digico/ui'
import { formatCurrency } from '@digico/utils'

import { useReadSelfInvoiceItems } from '@billing/self-invoice/hooks/queries/item'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

type Props = {
    className?: string
}

export const SelfInvoiceItemList = ({ className = '' }: Props) => {
    const { id: self_invoice_id } = useParams()

    const querySelfInvoiceItem = useReadSelfInvoiceItems(Number(self_invoice_id))

    return (
        <Table className={className} items={querySelfInvoiceItem.data?.data ?? []}>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Qte</Table.Head>
            <Table.Head>Prix</Table.Head>
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
