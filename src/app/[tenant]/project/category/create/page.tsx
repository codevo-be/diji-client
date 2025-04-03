import { BackButton } from '@/libs/button/index'
import { Grid } from '@/libs/Grid'
import { CategoryCreateForm } from '@/modules/category/components/CategoryCreateForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Item>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item column={9}>
                <CategoryCreateForm />
            </Grid.Item>
        </Grid>
    )
}
