'use client'

import { Grid } from '@digico/ui'

import { BoxBrevo } from '@components/settings/billing/BoxBrevo'
import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={12}>
                <MenuSettings />
            </Grid.Col>
            <Grid.Col column={6}>
                <BoxBrevo />
            </Grid.Col>
        </Grid>
    )
}
