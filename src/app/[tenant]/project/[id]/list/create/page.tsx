'use client'

import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { CreateColumnForm } from '@task/list/components/CreateColumnForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl('/contact')}>
                    Tâche
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <CreateColumnForm />
            </Grid.Col>
        </Grid>
    )
}
