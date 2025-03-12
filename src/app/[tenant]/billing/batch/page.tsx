'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useState } from 'react'
import { Form, Grid, SimpleSelect } from '@digico/ui'

import { CreditNoteBatchList } from '@billing/batch-process/components/CreditNoteBatchList'
import { InvoiceBatchList } from '@billing/batch-process/components/InvoiceBatchList'
import { SelfInvoiceBatchList } from '@billing/batch-process/components/SelfInvoiceBatchList'
import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'

export default function Page() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [type, setType] = useState('invoice')

    const onSetFilter = (e: any) => {
        const date = e.target.value
        const params = new URLSearchParams(searchParams)
        params.set('date', date)
        router.push(`?${params.toString()}`)
    }

    const onChangeType = (option: { label: string; value: string | number }) => {
        setType(String(option.value))
    }

    return (
        <Grid>
            <Grid.Col>
                <MenuInvoice />
            </Grid.Col>

            <Grid.Col className="flex gap-16 border-b border-b-grey-600 py-4">
                <SimpleSelect
                    onChange={onChangeType}
                    name="type"
                    defaultValue={{
                        label: 'Facture',
                        value: 'invoice'
                    }}
                    label="Type de document"
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
            </Grid.Col>

            {type === 'invoice' && <InvoiceBatchList />}
            {type === 'self_invoice' && <SelfInvoiceBatchList />}
            {type === 'credit_note' && <CreditNoteBatchList />}
        </Grid>
    )
}
