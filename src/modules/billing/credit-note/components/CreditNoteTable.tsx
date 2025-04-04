'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Table, Tag } from '@digico/ui'
import { DateHelper, formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'
import { months } from 'data/date'

import { CreditNoteType } from '../types/credit-note'

import { SimpleSelect } from '@components/helpers/SimpleSelect'

import { CREDIT_NOTE_STATUSES } from '../data/credit-note-statuses'

type Props = {
    items: CreditNoteType[]
}

export const CreditNoteTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (credit_note: CreditNoteType) => {
        routeWithTenant.push(`/billing/credit-note/${credit_note.id}`)
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
            <Table.Head>Total</Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeStatus} name="status" placeholder="Statut de la note de crédit" options={Object.values(CREDIT_NOTE_STATUSES)} />
            </Table.Head>
            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: CreditNoteType) => {
                    if (!invoice.recipient) {
                        return ''
                    }
                    return `${invoice.recipient?.street} ${invoice.recipient?.street_number} ${invoice.recipient?.city} ${invoice.recipient?.zipcode} ${invoice.recipient?.country}`
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return DateHelper.format(credit_note.date)
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return formatCurrency(credit_note.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return formatCurrency(credit_note.total ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    const status = CREDIT_NOTE_STATUSES[credit_note.status]

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
