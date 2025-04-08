'use client'

import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { CreateProjectForm } from '@task/project/components/CreateProjectForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl(`/project`)}>
                    Projet
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <CreateProjectForm />
            </Grid.Col>
        </Grid>
    )
}
