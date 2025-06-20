'use client'

import { Grid } from '@digico/ui'

import { BoxBilling } from '@components/settings/billing/BoxBilling'
import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={12}>
                <MenuSettings />
            </Grid.Col>
            <Grid.Col column={6}>
                <BoxBilling />
            </Grid.Col>
        </Grid>
    )
}
