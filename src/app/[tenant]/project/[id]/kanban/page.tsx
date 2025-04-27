'use client'

import { Grid } from '@digico/ui'

import { MenuProject } from '@project/components/molecules/MenuProject'
import { TaskSwitchView } from '@task/components/molecules/TaskSwitchView'
import { TaskKanban } from '@task/kanban/components/TaskKanban'

export default function Page() {
    return (
        <Grid>
            <Grid.Col className="flex justify-between items-start">
                <MenuProject />
                <TaskSwitchView />
            </Grid.Col>
            <Grid.Col>
                <TaskKanban />
            </Grid.Col>
        </Grid>
    )
}
