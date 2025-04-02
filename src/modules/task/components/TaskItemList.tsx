import {useParams} from "next/navigation";

import { Table } from '@/libs/Table'
import { useReadTaskItem } from "@/modules/task/hooks/supplier/queries/useReadTaskItem"
import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const TaskItemList = () => {
    const params = useParams()
    const task_column_id = params.id

    const query = useReadTaskItem({
        task_column_id: Number(task_column_id),
        ...useSearchQueryParams()
    })

    return (
        <LoadingQuery query={query}>
            {({ items }) => {

                return (
                    <Table items={items}>
                        <Table.Head>ID</Table.Head>
                        <Table.Head>ID de la colonne</Table.Head>
                        <Table.Head>Nom</Table.Head>
                        <Table.Head>Description</Table.Head>
                        <Table.Head>Statut</Table.Head>
                        <Table.Head>Priorité</Table.Head>

                        <Table.Item name={'id'} />
                        <Table.Item name={'task_column_id'} />
                        <Table.Item name={'name'} />
                        <Table.Item name={'description'} />
                        <Table.Item name={'status'} />
                        <Table.Item name={'priority'} />
                    </Table>
                )
            }}
        </LoadingQuery>
    )

}
