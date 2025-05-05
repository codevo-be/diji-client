'use client'

import { Table } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { ExpenseType } from '@expense/type/expense'

type Props = {
    data: ExpenseType | undefined
    className?: string
}

export const ExpenseItemList = ({ data, className = '' }: Props) => {
    const items = data?.lines ?? []

    return (
        <Table className={className} items={items}>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Qte</Table.Head>
            <Table.Head>Prix U. HT</Table.Head>
            <Table.Head>TVA</Table.Head>
            <Table.Head>Total HT</Table.Head>

            <Table.Col name="name" />
            <Table.Col name="quantity" />
            <Table.Col>
                {(item) => formatCurrency(item.price ?? 0)}
            </Table.Col>
            <Table.Col>
                {(item) => `${item.vat ?? 0}%`}
            </Table.Col>
            <Table.Col>
                {(item) => {
                    if (!item.quantity || !item.price) return ''
                    return formatCurrency(item.quantity * item.price)
                }}
            </Table.Col>
        </Table>
    )
}
