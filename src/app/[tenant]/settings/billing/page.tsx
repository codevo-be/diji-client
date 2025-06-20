'use client'

import { Grid } from '@digico/ui'

import { SettingNumberField } from '@components/settings/billing/SettingNumberField'
import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={12}>
                <MenuSettings />
            </Grid.Col>
            <Grid.Col column={6}>
                <SettingNumberField />
            </Grid.Col>
        </Grid>
    )
}
