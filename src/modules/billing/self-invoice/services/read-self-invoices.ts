import { SelfInvoiceType } from '../types/self-invoice'
import { PaginateType } from 'types/paginate'

import { HttpService } from '.'

export const readSelfInvoices = async (params?: Record<string, any>) =>
    HttpService.get<{
        meta: PaginateType
        data: SelfInvoiceType[]
    }>(`/`, params)
