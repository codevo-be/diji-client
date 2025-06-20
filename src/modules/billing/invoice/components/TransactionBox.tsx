import { useParams } from 'next/navigation'

import { Box, Button, Grid, Table } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'

import { useUpdateInvoice } from '../hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { TransactionType } from '@billing/transaction/types/transaction'

import { INVOICE_STATUS_PAYED, INVOICE_STATUS_PENDING } from '../data/invoice-statuses'

export const TransactionsBox = () => {
    const { id } = useParams()

    const { data, isSuccess } = useReadInvoice(Number(id), {
        include: ['transactions']
    })
    const updateInvoice = useUpdateInvoice()

    const transactions = data?.transactions ?? []

    const onChangeStatusToPayed = () => {
        updateInvoice.mutate({
            id: Number(id),
            status: INVOICE_STATUS_PAYED
        })
    }

    if (!isSuccess) {
        return null
    }

    return (
        <Grid.Col>
            <Box>
                <Table items={transactions}>
                    <Table.Head>Date de la transaction</Table.Head>
                    <Table.Head>Communication structurée</Table.Head>
                    <Table.Head>Montant</Table.Head>
                    <Table.Col>
                        {(transaction: TransactionType) => {
                            return DateHelper.format(transaction.date)
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

                {data.status === INVOICE_STATUS_PENDING && (
                    <Button isLoading={updateInvoice.isPending} onClick={onChangeStatusToPayed} className="w-full mt-12" intent={'success'}>
                        Facture payée
                    </Button>
                )}
            </Box>
        </Grid.Col>
    )
}
