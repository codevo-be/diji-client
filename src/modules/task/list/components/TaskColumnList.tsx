'use client'

import { Table } from '@digico/ui'

type Props = {
    items: {
        id: number
        name: string
        order: number
        project_id: number
    }[]
}

export const TaskColumnList = ({ items }: Props) => {
    return (
        <Table items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Ordre</Table.Head>

            <Table.Col name="id" />
            <Table.Col name="name" />
            <Table.Col name="order" />
        </Table>
    )
}
