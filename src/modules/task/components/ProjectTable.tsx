import { Button, Table } from '@digico/ui'
import { DateHelper, useAuth } from '@digico/utils'

import { ProjectType } from '../types/project.types'


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

            <Table.Col name="identifier" />
            <Table.Col>
                {(project: ProjectType) => {
                    return (
                        <Button intent={'text'} href={routes.workspace.project.edit.index(workspace.slug, project.id)}>
                            {project.name ? project.name : project.identifier}
                        </Button>
                    )
                }}
            </Table.Col>
            <Table.Col>
                {"5"}
            </Table.Col>
            <Table.Col>
                {(project) => {
                    return project.created_at ? DateHelper.format(project.created_at) : null
                }}
            </Table.Col>
            <Table.Col>
                {(project) => {
                    return project.updated_at ? DateHelper.format(project.updated_at) : null
                }}
            </Table.Col>
            <Table.Col>
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full bg-gray-200 rounded-lg h-4 relative">
                        <div className="h-4 bg-blue-400 rounded-lg" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
            </Table.Col>
            <Table.Col>
                {() => (
                    <Button href={routes.workspace.taskColumns.list(workspace.slug)} intent="outlinePrimary">
                        Listes des tâches
                    </Button>
                )}
            </Table.Col>
        </Table>
    )
}
