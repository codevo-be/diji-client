'use client'

import { useParams } from 'next/navigation'

import { Box, Grid } from '@digico/ui'

import { TaskColumnCreateForm } from '@tasks/components/TaskColumnCreateForm'

export default function Page() {
    const { id: projectId } = useParams()

    return (
        <Grid>
            <Grid.Col>
                {/*<BackButton intent={'text'} /> */} {/*todo: trouver comment c'est géré*/}
            </Grid.Col>
            <Grid.Col column={9}>
                <Box title={'Créer une nouvelle liste'}>
                    <TaskColumnCreateForm projectId={Number(projectId)} />
                </Box>
            </Grid.Col>
        </Grid>
    )
}
