import { useParams } from 'next/navigation'

import { Box, Grid, Table } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'

import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { TransactionType } from '@billing/types/transaction'

import { INVOICE_STATUS_DRAFT } from '../data/invoice-statuses'

export const TransactionsBox = () => {
    const { id } = useParams()

    const { data: invoice } = useReadInvoice(Number(id), {
        include: ['transactions']
    })

    if (invoice?.data.status === INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Box>
                <Table items={invoice?.data?.transactions ?? []}>
                    <Table.Head>Date de la transaction</Table.Head>
                    <Table.Head>Communication structurée</Table.Head>
                    <Table.Head>Montant</Table.Head>
                    <Table.Col>
                        {(transaction: TransactionType) => {
                            return DateHelper.format(transaction.created_at)
                        }}
                    </Table.Col>
                    <Table.Col>
                        {(transaction) => {
                            return transaction.structured_communication
                        }}
                    </Table.Col>
                    <Table.Col>
                        {(transaction: TransactionType) => {
                            return formatCurrency(transaction.amount)
                        }}
                    </Table.Col>
                </Table>
            </Box>
        </Grid.Col>
    )
}
