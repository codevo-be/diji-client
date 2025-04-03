'use client'

import { useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { Box } from '@/libs/Box'
import { Button } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { ProjectBoxTotalAccepted } from '@/modules/project/index/components/ProjectBoxTotalAccepted'
import { ProjectBoxTotalPayed } from '@/modules/project/index/components/ProjectBoxTotalPayed'
import { ProjectList } from '@/modules/project/index/components/ProjectList'
import { ProjectsMenu } from '@/modules/project/index/components/ProjectsMenu'
import { useCreateProject } from '@/modules/project/index/hooks/mutations/useCreateProject'
import { useReadProjects } from '@/modules/project/index/hooks/queries/useReadProjects'
import { useSearchQueryParams } from '@/utils/helperService'
import { routes } from '@/utils/route'

export default function Home() {
    const { workspace } = useAuth()
    const router = useRouter()
    const mutationProject = useCreateProject()

    const queryProjects = useReadProjects({
        ...useSearchQueryParams()
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
            <Grid.Item column={6}>
                <ProjectsMenu />
            </Grid.Item>
            <Grid.Item column={6}>
                <div className="flex gap-4 justify-end">
                    <SearchBar />
                    <Button isLoading={mutationProject.isPending} onClick={handleCreateProject}>
                        Ajouter un projet
                    </Button>
                </div>
            </Grid.Item>
            <Grid.Item className="flex gap-4">
                <Box className="px-10 py-6">
                    <p className="text-xs font-medium text-grey-600 whitespace-nowrap mb-4">Projet</p>
                    <p className="text-md font-bold">{queryProjects.isSuccess ? queryProjects.data.items.length : '...'}</p>
                </Box>
                <ProjectBoxTotalAccepted />
                <ProjectBoxTotalPayed />
            </Grid.Item>
            <Grid.Item>
                <ProjectList />
            </Grid.Item>
        </Grid>
    )
}
