import { Box, Grid } from '@digico/ui'
import { TaskItemCreateForm } from '@tasks/components/TaskItemCreateForm'


export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                {/*<BackButton intent={'text'} />*/} {/*todo: trouver comment c'est géré*/}
            </Grid.Col>
            <Grid.Col column={9}>
                <Box title={'Créer une nouvelle tâche'}>
                    <TaskItemCreateForm />
                </Box>
            </Grid.Col>
        </Grid>
    )
}
