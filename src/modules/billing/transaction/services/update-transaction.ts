import { TransactionType } from '../types/transaction'

import { HttpService } from '.'

export const updateTransaction = async ({ id, ...data }: Partial<Omit<TransactionType, 'id'>> & { id: TransactionType['id'] }) =>
    HttpService.put<{
        data: TransactionType
    }>(`/${id}`, data)
