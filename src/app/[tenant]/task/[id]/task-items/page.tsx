'use client'

import { Button } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { TaskItemList} from "@/modules/task/components/TaskItemList";

export default function Index() {
    return (
        <Grid>
            <Grid.Item>
                <div className="flex gap-4 justify-end">
                    <SearchBar />
                    <Button href={'task/create'}>Ajouter une colonne</Button>
                </div>
            </Grid.Item>
            <Grid.Item>
                <TaskItemList />
            </Grid.Item>
        </Grid>
    )
}
