'use client'

import { Grid } from '@digico/ui'

import { MenuProject } from '@project/components/molecules/MenuProject'
import { ButtonCreateList } from '@task/components/atoms/ButtonCreateList'
import { TaskSwitchView } from '@task/components/molecules/TaskSwitchView'
import { TaskKanban } from '@task/kanban/components/TaskKanban'

export default function Page() {
    return (
        <Grid>
            <Grid.Col className="flex justify-between items-start">
                <MenuProject />
                <div className="flex shrink-0 gap-2">
                    <ButtonCreateList />
                    <TaskSwitchView />
                </div>
            </Grid.Col>
            <Grid.Col>
                <TaskKanban />
            </Grid.Col>
        </Grid>
    )
}
