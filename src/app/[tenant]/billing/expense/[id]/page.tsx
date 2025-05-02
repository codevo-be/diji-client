'use client'

import { useParams } from 'next/navigation'

import FilesBox from '@billing/expense/FilesBox'
import { Grid } from '@digico/ui'

import { ActionTransaction } from '@billing/transaction/components/organisms/ActionTransaction'
import { ResumeTransaction } from '@billing/transaction/components/organisms/ResumeTransaction'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {

    const params = useParams();
    const modelId = params.id as string;

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
            <Grid.Col>
                <FilesBox modelId={modelId} modelType={"expense"} />
            </Grid.Col>
        </Grid>
    )
}
