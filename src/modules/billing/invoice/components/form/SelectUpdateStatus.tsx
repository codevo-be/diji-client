import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

import { INVOICE_STATUSES } from '@billing/invoice/data/invoice-statuses'
import { Box } from '@digico/ui'
const Select = dynamic(() => import('react-select'), { ssr: false })
import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'

export const SelectUpdateStatus = () => {
    const { id } = useParams()
    const queryInvoice = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()

    const onCHangeStatus = ({ value }: any) => {
        updateInvoice.mutate({
            id: Number(id),
            status: value
        })
    }

    return (
        <Box>
            <Select
                onChange={onCHangeStatus}
                options={Object.values(INVOICE_STATUSES)}
                value={Object.values(INVOICE_STATUSES).find((opt) => opt.value === queryInvoice.data?.data.status) || null}
            />
        </Box>
    )
}
