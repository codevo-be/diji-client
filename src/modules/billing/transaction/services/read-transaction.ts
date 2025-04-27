import { TransactionType } from '../types/transaction'

import { HttpService } from '.'

export const readTransaction = async (id: number, params?: Record<string, any>) =>
    HttpService.get<{
        data: TransactionType
    }>(`/${id}`, params).then((response) => {
        return response.data
    })
