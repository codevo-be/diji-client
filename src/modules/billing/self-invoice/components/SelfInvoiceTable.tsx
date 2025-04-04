'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Table, Tag } from '@digico/ui'
import { DateHelper, formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'
import { months } from 'data/date'

import { SelfInvoiceType } from '../types/self-invoice'

import { SimpleSelect } from '@components/helpers/SimpleSelect'

import { SELF_INVOICE_STATUSES } from '../data/self-invoice-statuses'

type Props = {
    items: SelfInvoiceType[]
}

export const SelfInvoiceTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (self_invoice: SelfInvoiceType) => {
        routeWithTenant.push(`/billing/self-invoice/${self_invoice.id}`)
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
            <Table.Head>Expéditeur</Table.Head>
            <Table.Head>Destinataire</Table.Head>
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
                <SimpleSelect onChange={onChangeStatus} name="status" placeholder="Statut de la facture" options={Object.values(SELF_INVOICE_STATUSES)} />
            </Table.Head>
            <Table.Col name="identifier" />
            <Table.Col name="issuer.name" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return DateHelper.format(invoice.date)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return formatCurrency(invoice.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return formatCurrency(invoice.total ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    const status = SELF_INVOICE_STATUSES[invoice.status]

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
