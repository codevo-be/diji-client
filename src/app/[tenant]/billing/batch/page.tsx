'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useState } from 'react'
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
    const [type, setType] = useState('invoice')
    const [statuses, setStatuses] = useState(Object.values(INVOICE_STATUSES))

    const onSetFilter = (e: any) => {
        const date = e.target.value
        const params = new URLSearchParams(searchParams)
        params.set('date', date)
        router.push(`?${params.toString()}`)
    }

    const onChangeType = (option: { label: string; value: string | number } | null) => {
        if (!option) {
            return
        }

        setType(String(option.value))

        if (option.value === 'invoice') {
            setStatuses(Object.values(INVOICE_STATUSES))
        } else if (option.value === 'self_invoice') {
            setStatuses(Object.values(SELF_INVOICE_STATUSES))
        } else if (option.value === 'credit_note') {
            setStatuses(Object.values(CREDIT_NOTE_STATUSES))
        }
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

    return (
        <Grid>
            <Grid.Col>
                <MenuInvoice />
            </Grid.Col>

            <Grid.Col className="flex gap-16 border-b border-b-grey-600 py-4">
                <SimpleSelect
                    onChange={onChangeType}
                    defaultValue={'invoice'}
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
                <Form.Field onChange={onSetFilter} type="date" name="date" label="Filtrer par date" />
                <SimpleSelect label="Status" onChange={onChangeStatut} placeholder="Sélectionner un status" options={statuses} />
            </Grid.Col>

            {type === 'invoice' && <InvoiceBatchList />}
            {type === 'self_invoice' && <SelfInvoiceBatchList />}
            {type === 'credit_note' && <CreditNoteBatchList />}
        </Grid>
    )
}
