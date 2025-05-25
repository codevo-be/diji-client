'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, Tag } from '@digico/ui'
import { DateHelper } from '@digico/utils'

import { useUpdateRecurringInvoice } from '../hooks/mutations'
import { useReadRecurringInvoice } from '../hooks/queries'
import { RecurringInvoiceType } from '../types/recurring-invoice'

import { RECURRING_INVOICE_STATUS_ACTIVE } from '../data/recurring-invoice-statuses'

const frequencies = [
    {
        label: 'Chaque jour',
        value: 'daily'
    },
    {
        label: 'Chaque semaine',
        value: 'weekly'
    },
    {
        label: 'Chaque mois',
        value: 'monthly'
    },
    {
        label: 'Chaque année',
        value: 'yearly'
    }
]

export const RecurringBox = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    const form = useForm({
        values: data
    })
    const updateRecurringInvoice = useUpdateRecurringInvoice()

    const onSubmit = (data: RecurringInvoiceType) => {
        updateRecurringInvoice.mutate(data)
    }

    return (
        <Grid.Col>
            <Box>
                {data?.status === RECURRING_INVOICE_STATUS_ACTIVE && (
                    <div className="mb-8">
                        <p className="text-center text-xxs text-grey-800">Prochain lancement</p>
                        <Tag className="text-primary">{DateHelper.format(data?.next_run_at ?? '', 'dddd D MMMM YYYY')}</Tag>
                    </div>
                )}
                <Form useForm={form} onSubmit={onSubmit}>
                    <Form.Field label="Date de la récurrence" type="date" name="start_date" />
                    <Form.Select label="Fréquence" name="frequency" options={frequencies} />
                    <Button isLoading={updateRecurringInvoice.isPending} type="submit">
                        Sauvegarder
                    </Button>
                </Form>
            </Box>
        </Grid.Col>
    )
}
