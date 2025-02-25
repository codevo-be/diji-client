'use client'

import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { UpdateContactForm } from '@contact/components/form/UpdateContactForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl('/contact')}>
                    Contacts
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <UpdateContactForm />
            </Grid.Col>
        </Grid>
    )
}
