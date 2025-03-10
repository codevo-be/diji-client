'use client'

import { Button, Grid } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { BoxBilling } from '@components/settings/billing/BoxBilling'
import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    return (
        <Grid>
            <Grid.Col className="flex">
                <Button className="flex-shrink-0" intent={'text'} size={'text'} href={getTenantUrl('/settings')}>
                    ← Retour
                </Button>
                <MenuSettings />
            </Grid.Col>
            <Grid.Col column={6}>
                <BoxBilling />
            </Grid.Col>
        </Grid>
    )
}
