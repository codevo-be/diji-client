import { ProjectType } from '../types/project.types'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Table } from '@/libs/Table'
import { DateHelper } from '@/utils/date'
import { routes } from '@/utils/route'

type Props = {
    items: ProjectType[]
}

export const ProjectTable = ({ items }: Props) => {
    const { workspace } = useAuth()

    return (
        <Table items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Projet</Table.Head>
            <Table.Head>Membres</Table.Head>
            <Table.Head>Date de création</Table.Head>
            <Table.Head>Mise a jour</Table.Head>
            <Table.Head>Progression</Table.Head>
            <Table.Head>Liste des tâches</Table.Head>

            <Table.Item name="identifier" />
            <Table.Item>
                {(project: ProjectType) => {
                    return (
                        <Button intent={'text'} href={routes.workspace.project.edit.index(workspace.slug, project.id)}>
                            {project.name ? project.name : project.identifier}
                        </Button>
                    )
                }}
            </Table.Item>
            <Table.Item>
                {"5"}
            </Table.Item>
            <Table.Item>
                {(project) => {
                    return project.created_at ? DateHelper.format(project.created_at) : null
                }}
            </Table.Item>
            <Table.Item>
                {(project) => {
                    return project.updated_at ? DateHelper.format(project.updated_at) : null
                }}
            </Table.Item>
            <Table.Item>
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full bg-gray-200 rounded-lg h-4 relative">
                        <div className="h-4 bg-blue-400 rounded-lg" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
            </Table.Item>
            <Table.Item>
                {() => (
                    <Button href={routes.workspace.taskColumns.list(workspace.slug)} intent="outlinePrimary">
                        Listes des tâches
                    </Button>
                )}
            </Table.Item>

        </Table>
    )
}
