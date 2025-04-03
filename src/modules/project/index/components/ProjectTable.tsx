import { PROJECT_STATUSES } from '../helpers/statuses'
import { ProjectType } from '../types/project.types'

import { SelectStatusTable } from '@/components/SelectStatusTable'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Table } from '@/libs/Table'
import { Tag } from '@/libs/Tag'
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
            <Table.Head>Client</Table.Head>
            <Table.Head>
                <SelectStatusTable items={Object.values(PROJECT_STATUSES)} />
            </Table.Head>
            <Table.Head>Date de création</Table.Head>
            <Table.Head>Date de début</Table.Head>
            <Table.Head>Date de fin</Table.Head>
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
            <Table.Item name="contact_name" />
            <Table.Item className="flex">
                {(item: ProjectType) => {
                    //@ts-ignore
                    return <Tag intent={PROJECT_STATUSES[item.status].value}>{PROJECT_STATUSES[item.status].label}</Tag>
                }}
            </Table.Item>
            <Table.Item>
                {(project) => {
                    return project.created_at ? DateHelper.format(project.created_at) : null
                }}
            </Table.Item>
            <Table.Item>
                {(project) => {
                    return project.project_start_date ? DateHelper.format(project.project_start_date) : null
                }}
            </Table.Item>
            <Table.Item>
                {(project) => {
                    return project.project_end_date ? DateHelper.format(project.project_end_date) : null
                }}
            </Table.Item>
        </Table>
    )
}
