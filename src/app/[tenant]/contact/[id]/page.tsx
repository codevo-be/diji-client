'use client'

import { Grid, PageHeader } from '@digico/ui'

import { UpdateContactForm } from '@contact/components/form/UpdateContactForm'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const routerTenant = useRouteTenant()

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={routerTenant.get('/contact')}>
                    Contacts
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={9}>
                <UpdateContactForm />
            </Grid.Col>
        </Grid>
    )
}
