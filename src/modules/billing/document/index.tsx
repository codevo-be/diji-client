import { Box } from '@digico/ui'

import { InvoiceType } from '@billing/invoice/types/invoice'

import { Header } from './Header'

type Props = {
    children: React.ReactNode
    data: InvoiceType | undefined
    editable?: boolean
}

export const BillingDocument = ({ children, data }: Props) => {
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
