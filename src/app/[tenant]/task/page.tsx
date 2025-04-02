'use client'



import { Button, Grid } from '@digico/ui'

import { ProjectList } from '@tasks/components/ProjectList'

export default function Index() {
    return (
        <Grid>
            <Grid.Col>
                <div className="flex gap-4 justify-end">
                    <SearchBar />
                    <Button href={'task/create'}>Ajouter une tâche</Button>
                </div>
            </Grid.Col>
            <Grid.Col>
                <ProjectList/>
            </Grid.Col>
        </Grid>
    )
}
