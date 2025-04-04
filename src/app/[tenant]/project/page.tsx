'use client'

import { Button, Grid, PageHeader, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadProjects } from '@task/project/hooks/queries'

import { ProjectTable } from '@task/project/components/ProjectTable'

export default function Page() {
    const queryProjects = useReadProjects(useQueryParams())

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between">
                    <PageHeader>Projets</PageHeader>
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <Button href={'project/create'}>Ajouter un projet</Button>
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                {/* @ts-ignore */}
                <ProjectTable items={queryProjects.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
