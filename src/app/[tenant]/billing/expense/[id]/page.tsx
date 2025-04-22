'use client'

import { Grid } from '@digico/ui'

import { ActionTransaction } from '@billing/transaction/components/organisms/ActionTransaction'
import { ResumeTransaction } from '@billing/transaction/components/organisms/ResumeTransaction'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux dépenses">Dépense</PageHeader>
            </Grid.Col>

            <Grid.Col column={8}>
                <ResumeTransaction />
            </Grid.Col>
            <Grid.Col column={4}>
                <ActionTransaction />
            </Grid.Col>
        </Grid>
    )
}
