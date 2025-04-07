'use client'

import { useParams } from 'next/navigation'

import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { CreateColumnForm } from '@task/list/components/CreateColumnForm'

export default function Page() {
    const { id } = useParams()


    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl(`/project/${id}/list`)}>
                    Tâche
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <CreateColumnForm />
            </Grid.Col>
        </Grid>
    )
}
