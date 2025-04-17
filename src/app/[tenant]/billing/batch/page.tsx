'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { CREDIT_NOTE_STATUSES } from '@billing/credit-note/data/credit-note-statuses'
import { INVOICE_STATUSES } from '@billing/invoice/data/invoice-statuses'
import { SELF_INVOICE_STATUSES } from '@billing/self-invoice/data/self-invoice-statuses'
import { Form, Grid } from '@digico/ui'

import { CreditNoteBatchList } from '@billing/batch-process/components/CreditNoteBatchList'
import { InvoiceBatchList } from '@billing/batch-process/components/InvoiceBatchList'
import { SelfInvoiceBatchList } from '@billing/batch-process/components/SelfInvoiceBatchList'
import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { SimpleSelect } from '@components/helpers/SimpleSelect'

export default function Page() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [date, setDate] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [statuses, setStatuses] = useState(Object.values(INVOICE_STATUSES))

    const onSetDate = (e: any) => {
        const date = e.target.value
        setDate(date)
    }

    const onSetDateEnd = (e: any) => {
        const date = e.target.value
        setDateEnd(date)
    }

    const onChangeType = (option: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!option) {
            return
        }

        if (option.value === 'invoice') {
            setStatuses(Object.values(INVOICE_STATUSES))
        } else if (option.value === 'self_invoice') {
            setStatuses(Object.values(SELF_INVOICE_STATUSES))
        } else if (option.value === 'credit_note') {
            setStatuses(Object.values(CREDIT_NOTE_STATUSES))
        }

        params.set('type', String(option.value))
        router.push(`?${params.toString()}`)
    }

    const onChangeStatut = (option: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!option) {
            params.delete('status')
        } else {
            params.set('status', String(option.value))
        }

        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        if (!date || !dateEnd) {
            return
        }

        const params = new URLSearchParams(searchParams)
        params.set('date_from', String(date))
        params.set('date_to', String(dateEnd))
        router.push(`?${params.toString()}`)
    }, [searchParams, router, date, dateEnd])

    return (
        <Grid>
            <Grid.Col>
                <MenuInvoice />
            </Grid.Col>

            <Grid.Col className="flex gap-16 border-b border-b-grey-600 py-4">
                <SimpleSelect
                    defaultValue={searchParams.get('type') ?? 'invoice'}
                    onChange={onChangeType}
                    label="Type de document"
                    required={true}
                    options={[
                        {
                            label: 'Facture',
                            value: 'invoice'
                        },
                        {
                            label: 'Autofacturation',
                            value: 'self_invoice'
                        },
                        {
                            label: 'Note de crédit',
                            value: 'credit_note'
                        }
                    ]}
                />
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Filtre par date</span>
                    <div className="flex gap-2">
                        <Form.Field onChange={onSetDate} type="date" defaultValue={searchParams.get('date_from') ?? ''} />
                        <Form.Field onChange={onSetDateEnd} type="date" defaultValue={searchParams.get('date_to') ?? ''} />
                    </div>
                </div>
                <SimpleSelect
                    label="Status"
                    onChange={onChangeStatut}
                    placeholder="Sélectionner un status"
                    defaultValue={searchParams.get('status') ?? ''}
                    options={statuses}
                />
            </Grid.Col>

            {(searchParams.get('type') === 'invoice' || !searchParams.get('type')) && <InvoiceBatchList />}
            {searchParams.get('type') === 'self_invoice' && <SelfInvoiceBatchList />}
            {searchParams.get('type') === 'credit_note' && <CreditNoteBatchList />}
        </Grid>
    )
}
