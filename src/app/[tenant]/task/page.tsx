'use client'

import { Button } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import {ProjectList} from "@/modules/task/components/ProjectList";

export default function Index() {
    return (
        <Grid>
            <Grid.Item>
                <div className="flex gap-4 justify-end">
                    <SearchBar />
                    <Button href={'task/create'}>Ajouter une tâche</Button>
                </div>
            </Grid.Item>
            <Grid.Item>
                <ProjectList/>
            </Grid.Item>
        </Grid>
    )
}
