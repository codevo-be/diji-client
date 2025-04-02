import {useParams} from "next/navigation";

import { Table, useQueryParams } from '@digico/ui'

import { useReadTaskItem } from '@tasks/hooks/supplier/queries/useReadTaskItem'

import { LoadingQuery } from '@/utils/LoadingQuery'

export const TaskItemList = () => {
    const params = useParams()
    const task_column_id = params.id

    const query = useReadTaskItem({
        task_column_id: Number(task_column_id),
        ...useQueryParams()
    })

    return (
        <LoadingQuery query={query}>
            {({ items }:any) => {

                return (
                    <Table items={items}>
                        <Table.Head>ID</Table.Head>
                        <Table.Head>ID de la colonne</Table.Head>
                        <Table.Head>Nom</Table.Head>
                        <Table.Head>Description</Table.Head>
                        <Table.Head>Statut</Table.Head>
                        <Table.Head>Priorité</Table.Head>

                        <Table.Col name={'id'} />
                        <Table.Col name={'task_column_id'} />
                        <Table.Col name={'name'} />
                        <Table.Col name={'description'} />
                        <Table.Col name={'status'} />
                        <Table.Col name={'priority'} />
                    </Table>
                )
            }}
        </LoadingQuery>
    )

}
