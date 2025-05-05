import React from 'react'
import { Box } from '@digico/ui'
import { ExpenseType } from '@expense/type/expense'

import { Header } from './Header'

type Props = {
    children: React.ReactNode
    data: ExpenseType | undefined
    editable?: boolean
}

export const ExpenseDocument = ({ children, data }: Props) => {
    if (!data) {
        return
    }

    return (
        <Box size={'xl'} className="aspect-[210/297]">
            <Header data={data} />
            <div className="mt-16 mb-40">{children}</div>
        </Box>
    )
}
