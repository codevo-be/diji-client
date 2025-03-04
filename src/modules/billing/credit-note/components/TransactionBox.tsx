import { useParams } from 'next/navigation'

import { Box, Button, Grid, Table } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'

import { useUpdateCreditNote } from '../hooks/mutations'
import { useReadCreditNote } from '../hooks/queries'
import { TransactionType } from '@billing/types/transaction'

import { CREDIT_NOTE_STATUS_PENDING, CREDIT_NOTE_STATUS_REFUND } from '../data/credit-note-statuses'

export const TransactionsBox = () => {
    const { id } = useParams()

    const { data, isSuccess } = useReadCreditNote(Number(id), {
        include: ['transactions']
    })
    const updateCreditNote = useUpdateCreditNote()

    const transactions = data?.transactions ?? []

    const onChangeStatusToRefund = () => {
        updateCreditNote.mutate({
            id: Number(id),
            status: CREDIT_NOTE_STATUS_REFUND
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

                {data.status === CREDIT_NOTE_STATUS_PENDING && (
                    <Button isLoading={updateCreditNote.isPending} onClick={onChangeStatusToRefund} className="w-full mt-12" intent={'success'}>
                        Note de crédit remboursée
                    </Button>
                )}
            </Box>
        </Grid.Col>
    )
}
