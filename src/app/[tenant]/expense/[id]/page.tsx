'use client'

import { useParams } from 'next/navigation'

import { BillingDocument } from '@billing/document'
import { Grid } from '@digico/ui'

import { useReadExpense } from '@expense/hooks/queries'

import { PageHeader } from '@helpers/PageHeader'
import { ExpenseContent } from '@expense/components/ExpenseContent'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux dépenses">Facture {data?.document_identifier}</PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    <ExpenseContent />
                </BillingDocument>
            </Grid.Col>
        </Grid>
    )
}
