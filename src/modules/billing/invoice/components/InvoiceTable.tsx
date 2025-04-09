'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { INVOICE_STATUSES } from '@billing/invoice/data/invoice-statuses'
import { Table, Tag } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'
import clsx from 'clsx'
import { months } from 'data/date'

import { InvoiceType } from '@billing/invoice/types/invoice'

import { SimpleSelect } from '@helpers/SimpleSelect'
import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: InvoiceType[]
}

export const InvoiceTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const routeWithTenant = useRouteTenant()

    const toSingle = (invoice: InvoiceType) => {
        routeWithTenant.push(`/billing/invoice/${invoice.id}`)
    }

    const onChangeStatus = (data: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!data) {
            params.delete('status')
        } else {
            params.delete('search')
            params.set('status', String(data.value))
        }

        router.push(`?${params.toString()}`)
    }

    const onChangeDate = (data: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!data) {
            params.delete('month')
        } else {
            params.delete('search')
            params.set('month', String(data.value))
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Adresse</Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeDate} placeholder="Mois" options={months} />
            </Table.Head>

            <Table.Head>Sous-total</Table.Head>
            <Table.Head>
                Total (
                {formatCurrency(
                    items.reduce((current, item) => {
                        return current + (item.total ?? 0)
                    }, 0)
                )}
                )
            </Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeStatus} placeholder="Statut de la facture" options={Object.values(INVOICE_STATUSES)} />
            </Table.Head>

            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: InvoiceType) => {
                    if (!invoice.recipient) {
                        return ''
                    }
                    return `${invoice.recipient?.street} ${invoice.recipient?.street_number} ${invoice.recipient?.city} ${invoice.recipient?.zipcode} ${invoice.recipient?.country}`
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return DateHelper.format(invoice.date)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return formatCurrency(invoice.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return formatCurrency(invoice.total ?? 0)
                }}
            </Table.Col>
            <Table.Col className="flex">
                {(invoice: InvoiceType) => {
                    const status = INVOICE_STATUSES[invoice.status]

                    return (
                        <Tag className={clsx(`text-${status.color}`)} size={'xs'}>
                            {status.label}
                        </Tag>
                    )
                }}
            </Table.Col>
        </Table>
    )
}
