import { HistoryType } from '../types/history'
import { PaginateType } from 'types/paginate'

import { HttpService } from '.'

export const readHistories = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: HistoryType[]
        meta: PaginateType
    }>(`/`, params)
