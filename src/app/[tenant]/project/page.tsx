'use client'

import { Button, Grid, PageHeader, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadProjects } from '@project/hooks/queries'

import { ProjectTable } from '@project/components/molecules/ProjectTable'

export default function Page() {
    const queryProjects = useReadProjects({
        page: 1,
        ...useQueryParams()
    })

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
                <ProjectTable items={queryProjects.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
