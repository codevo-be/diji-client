'use client'

import { Grid } from '@digico/ui'
import { TaskProvider } from '@task/contexts/task/TaskProvider'

import { MenuProject } from '@project/components/molecules/MenuProject'
import { ButtonCreateList } from '@task/components/atoms/ButtonCreateList'
import { TaskGroups } from '@task/components/molecules/TaskGroups'
import { TaskSwitchView } from '@task/components/molecules/TaskSwitchView'
import { ModalTask } from '@task/components/organisms/ModalTask'

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
                <TaskProvider>
                    <Grid>
                        <Grid.Col column={7}>
                            <TaskGroups />
                        </Grid.Col>
                        <Grid.Col column={5}>
                            <ModalTask />
                        </Grid.Col>
                    </Grid>
                </TaskProvider>
            </Grid.Col>
        </Grid>
    )
}
