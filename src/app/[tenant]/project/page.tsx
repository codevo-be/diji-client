'use client'

import { useRouter } from 'next/navigation'

import { Box, Button, Grid, QuerySearchBar, useQueryParams } from '@digico/ui'
import { useAuth } from '@digico/utils'

import { useCreateProject } from '@projects/index/hooks/mutations/useCreateProject'
import { useReadProjects } from '@projects/index/hooks/queries/useReadProjects'

import { ProjectBoxTotalAccepted } from '@projects/index/components/ProjectBoxTotalAccepted'
import { ProjectBoxTotalPayed } from '@projects/index/components/ProjectBoxTotalPayed'
import { ProjectsMenu } from '@projects/index/components/ProjectsMenu'
import { ProjectList } from '@tasks/components/ProjectList'


export default function Home() {
    const { workspace } = useAuth()
    const router = useRouter()
    const mutationProject = useCreateProject()

    const queryProjects = useReadProjects({
        ...useQueryParams()
    })

    const handleCreateProject = () => {
        mutationProject.mutate(undefined, {
            onSuccess: ({ item }) => {
                router.push(routes.workspace.project.edit.index(workspace.slug, item.id))
            }
        })
    }

    return (
        <Grid>
            <Grid.Col column={6}>
                <ProjectsMenu />
            </Grid.Col>
            <Grid.Col column={6}>
                <div className="flex gap-4 justify-end">
                    <QuerySearchBar />
                    <Button isLoading={mutationProject.isPending} onClick={handleCreateProject}>
                        Ajouter un projet
                    </Button>
                </div>
            </Grid.Col>
            <Grid.Col className="flex gap-4">
                <Box className="px-10 py-6">
                    <p className="text-xs font-medium text-grey-600 whitespace-nowrap mb-4">Projet</p>
                    <p className="text-md font-bold">{queryProjects.isSuccess ? queryProjects.data.items.length : '...'}</p>
                </Box>
                <ProjectBoxTotalAccepted />
                <ProjectBoxTotalPayed />
            </Grid.Col>
            <Grid.Col>
                <ProjectList />
            </Grid.Col>
        </Grid>
    )
}
