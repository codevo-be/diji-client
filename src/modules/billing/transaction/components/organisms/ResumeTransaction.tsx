import { useParams } from 'next/navigation'

import { Box, Grid } from '@digico/ui'
import { DateHelper, formatCurrency, formatStructuredCommunication } from '@digico/utils'

import { useReadTransaction } from '@billing/transaction/hooks/queries/useReadTransaction'

export const ResumeTransaction = () => {
    const { id } = useParams()
    const { data, isSuccess } = useReadTransaction(Number(id))

    if (!isSuccess) {
        return null
    }

    return (
        <Grid>
            <Grid.Col column={6}>
                <Box title="De" className="h-full">
                    <h2>{data.debtor_name}</h2>
                </Box>
            </Grid.Col>
            <Grid.Col column={6}>
                <Box title="À">
                    <h2>{data.creditor_name}</h2>
                </Box>
            </Grid.Col>
            <Grid.Col>
                <Box>
                    <p className="text-sm">
                        Le <strong className="font-semibold">{DateHelper.format(data.date, 'DD MMMM YYYY')}</strong> une dépense de{' '}
                        {formatCurrency(data.amount)}.
                    </p>
                    <p className="text-sm">{formatStructuredCommunication(data.structured_communication)}</p>
                </Box>
            </Grid.Col>
        </Grid>
    )
}
