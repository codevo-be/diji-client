'use client'

import { Grid } from '@digico/ui'

import { MenuTask } from '@task/components/MenuTask'

export default function Page() {


    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>
        </Grid>
    )
}
