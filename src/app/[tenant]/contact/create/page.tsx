'use client'

import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { CreateContactForm } from '@contact/components/form/CreateContactForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl('/contact')}>
                    Contacts
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <CreateContactForm />
            </Grid.Col>
        </Grid>
    )
}
