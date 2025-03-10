'use client'

import { Grid, PageHeader } from '@digico/ui'

import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <PageHeader>Paramètres</PageHeader>
                <MenuSettings />
            </Grid.Col>
        </Grid>
    )
}
