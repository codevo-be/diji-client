'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { ActionTransaction } from '@billing/transaction/components/organisms/ActionTransaction'
import { ResumeTransaction } from '@billing/transaction/components/organisms/ResumeTransaction'
import FilesBox from '@components/upload/FilesBox'
import { PageHeader } from '@helpers/PageHeader'
import { ModalProvider } from '../../../../../context/ModalContext'

export default function Page() {

    const params = useParams();
    const modelId = params.id as string;

    return (
        <ModalProvider>
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
        </ModalProvider>
    )
}
