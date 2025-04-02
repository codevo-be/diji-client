'use client'

import { Button, Grid } from '@digico/ui'

import { TaskItemList } from '@tasks/components/TaskItemList'

export default function Index() {
    return (
        <Grid>
            <Grid.Col>
                <div className="flex gap-4 justify-end">
                    {/*<SearchBar />*/}
                    <Button href={'task/create'}>Ajouter une colonne</Button>
                </div>
            </Grid.Col>
            <Grid.Col>
                <TaskItemList />
            </Grid.Col>
        </Grid>
    )
}
