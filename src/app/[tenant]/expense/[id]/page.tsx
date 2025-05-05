'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadExpense } from '@expense/hooks/queries'

import { ExpenseContent } from '@expense/components/ExpenseContent'
import { ExpenseDocument } from '@expense/components/ExpenseDocument/ExpenseDocument'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadExpense(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux dépenses">Dépense : facture {data?.document_identifier}</PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <ExpenseDocument data={data}>
                    <ExpenseContent />
                </ExpenseDocument>
            </Grid.Col>
        </Grid>
    )
}
