'use client'

import { Grid, PageHeader } from '@digico/ui'

import { CreateProjectForm } from '@project/components/organisms/CreateProjectForm'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const routerTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={routerTenant.get(`/project`)}>
                    Projet
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={9}>
                <CreateProjectForm />
            </Grid.Col>
        </Grid>
    )
}
