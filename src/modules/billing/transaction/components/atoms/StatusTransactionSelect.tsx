import { useParams } from 'next/navigation'

import { TRANSACTION_STATUSES } from '@billing/transaction/data/transaction-statuses'

import { useUpdateTransaction } from '@billing/transaction/hooks/mutations/useUpdateTransaction'
import { useReadTransaction } from '@billing/transaction/hooks/queries/useReadTransaction'

import { OptionType, SimpleSelect } from '@helpers/SimpleSelect'

export const StatusTransactionSelect = () => {
    const { id } = useParams()
    const { data } = useReadTransaction(Number(id))
    const updateTransaction = useUpdateTransaction()

    const onChangeStatus = (option: OptionType | null) => {
        updateTransaction.mutate({
            id: Number(id),
            //@ts-ignore
            status: option?.value
        })
    }

    if (!data) {
        return null
    }

    return <SimpleSelect label="Statut" defaultValue={data.status} onChange={onChangeStatus} options={Object.values(TRANSACTION_STATUSES)} />
}
