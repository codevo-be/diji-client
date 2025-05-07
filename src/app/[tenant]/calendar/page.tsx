'use client'

import { Grid } from '@digico/ui'

import { BoxBilling } from '@components/settings/billing/BoxBilling'
import { BoxBrevo } from '@components/settings/billing/BoxBrevo'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={6}>
                <BoxBilling />
            </Grid.Col>
            <Grid.Col column={6}>
                <BoxBrevo />
            </Grid.Col>
        </Grid>
    )
}
