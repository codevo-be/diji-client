import { useParams } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Table } from '@/libs/Table'
import { DateHelper } from '@/utils/date'
import { routes } from '@/utils/route'

type Props = {
    items: []
}

export const ReportTable = ({ items }: Props) => {
    const { id } = useParams()
    const { workspace } = useAuth()

    return (
        <Table items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Rédacteur</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Item name="id" />
            <Table.Item>
                {(report) => {
                    return (
                        <Button intent={'text'} href={routes.workspace.project.edit.report.edit(workspace.slug, Number(id), report.id)}>
                            {report.name}
                        </Button>
                    )
                }}
            </Table.Item>
            <Table.Item>
                {(report) => {
                    return report.user.fullname
                }}
            </Table.Item>
            <Table.Item>
                {(report) => {
                    return DateHelper.format(report.created_at)
                }}
            </Table.Item>
        </Table>
    )
}
