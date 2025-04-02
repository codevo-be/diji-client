'use client'


import { useParams } from 'next/navigation'

import { Box, Grid } from '@digico/ui'

import { TaskColumnCreateForm } from '@tasks/components/TaskColumnCreateForm'

export default function Page() {
    const { id: projectId } = useParams()

    return (
        <Grid>
            <Grid.Item>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item column={9}>
                <Box title={'Créer une nouvelle liste'}>
                    <TaskColumnCreateForm projectId={Number(projectId)} />
                </Box>
            </Grid.Item>
        </Grid>
    )
}
