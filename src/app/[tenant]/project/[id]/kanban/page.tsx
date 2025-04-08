'use client'

import { Grid } from '@digico/ui'

import { MenuTask } from '@task/components/MenuTask'
import { TaskKanban } from '@task/components/TaskKanban'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>

            <Grid.Col>
                <TaskKanban />
            </Grid.Col>
        </Grid>
    )
}
