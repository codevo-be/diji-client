import { TransactionType } from '../types/transaction'
import { PaginateType } from 'types/paginate'

import { HttpService } from '.'

export const readTransactions = async (params?: Record<string, any>) =>
    HttpService.get<{
        meta: PaginateType
        data: TransactionType[]
    }>(`/`, params)
