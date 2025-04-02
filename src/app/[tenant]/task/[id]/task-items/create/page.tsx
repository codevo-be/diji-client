import { Box } from '@/libs/Box'
import { BackButton } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { TaskItemCreateForm } from "@/modules/task/components/TaskItemCreateForm";

export default function Page() {
    return (
        <Grid>
            <Grid.Item>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item column={9}>
                <Box title={'Créer une nouvelle tâche'}>
                    <TaskItemCreateForm />
                </Box>
            </Grid.Item>
        </Grid>
    )
}
