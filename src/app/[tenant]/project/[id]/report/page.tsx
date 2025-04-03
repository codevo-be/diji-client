'use client'

import { useParams, useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { ProjectMenu } from '@/modules/project/index/components/ProjectMenu'
import { ReportList } from '@/modules/project/report/components/ReportList'
import { useCreateProjectReport } from '@/modules/project/report/hooks/mutations/useCreateProjectReport'
import { routes } from '@/utils/route'

export default function Page() {
    const { id } = useParams()
    const { workspace } = useAuth()
    const router = useRouter()

    const mutationReport = useCreateProjectReport()

    const handleCreateReport = () => {
        mutationReport.mutate(
            {
                project_id: id,
                name: 'Rapport'
            },
            {
                onSuccess: (report) => {
                    router.push(routes.workspace.project.edit.report.edit(workspace.slug, Number(id), report.item.id))
                }
            }
        )
    }

    return (
        <Grid>
            <Grid.Item column={6}>
                <ProjectMenu />
            </Grid.Item>
            <Grid.Item column={6} className="flex justify-end gap-4">
                <SearchBar />
                <Button isLoading={mutationReport.isPending} onClick={handleCreateReport}>
                    Ajouter un rapport
                </Button>
            </Grid.Item>
            <Grid.Item>
                <ReportList />
            </Grid.Item>
        </Grid>
    )
}
