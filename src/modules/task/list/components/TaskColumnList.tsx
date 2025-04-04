'use client'

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
        <div>
            {items.map((col) => (
                <div key={col.id} className="text-lg font-semibold">{col.name}</div>
            ))}
        </div>
    )
}
