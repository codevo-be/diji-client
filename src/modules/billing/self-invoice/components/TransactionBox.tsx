import { useParams } from 'next/navigation'

import { Box, Button, Grid, Table } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'

import { useUpdateSelfInvoice } from '../hooks/mutations'
import { useReadSelfInvoice } from '../hooks/queries'
import { TransactionType } from '@billing/types/transaction'

import { SELF_INVOICE_STATUS_PAYED, SELF_INVOICE_STATUS_PENDING } from '../data/self-invoice-statuses'

export const TransactionsBox = () => {
    const { id } = useParams()

    const { data, isSuccess } = useReadSelfInvoice(Number(id), {
        include: ['transactions']
    })
    const updateSelfInvoice = useUpdateSelfInvoice()

    const transactions = data?.transactions ?? []

    const onChangeStatusToPayed = () => {
        updateSelfInvoice.mutate({
            id: Number(id),
            status: SELF_INVOICE_STATUS_PAYED
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

                {data.status === SELF_INVOICE_STATUS_PENDING && (
                    <Button isLoading={updateSelfInvoice.isPending} onClick={onChangeStatusToPayed} className="w-full mt-12" intent={'success'}>
                        Facture payée
                    </Button>
                )}
            </Box>
        </Grid.Col>
    )
}
