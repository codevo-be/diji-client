'use client'

import { Button, Grid, PageHeader, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadProjects } from '@task/hooks/queries'

import { ContactTable } from '@contact/components/ContactTable'

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
                <ContactTable items={queryProjects.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
