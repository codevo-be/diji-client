'use client'

import { Button, Grid } from '@digico/ui'

export default function Index() {
    return (
        <Grid>
            <Grid.Col>
                <div className="flex gap-4 justify-end">
                    <Button href={'task/create'}>Ajouter une tâche</Button>
                </div>
            </Grid.Col>
        </Grid>
    )
}
