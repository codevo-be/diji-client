'use client'

import { Grid } from '@digico/ui'

import { BoxBilling } from '@components/settings/billing/BoxBilling'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={6}>
                <BoxBilling />
            </Grid.Col>
        </Grid>
    )
}
