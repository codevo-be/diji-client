'use client'

import { Box } from '@digico/ui'

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
                <Box key={col.id} size="default" className="p-4 flex flex-col gap-2" intent="info">
                    <div className="text-lg font-semibold">{col.name}</div>
                </Box>
            ))}
        </div>
    )
}
