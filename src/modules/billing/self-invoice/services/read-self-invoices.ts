import { SelfInvoiceType } from '../types/self-invoice'

import { HttpService } from '.'

export const readSelfInvoices = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: SelfInvoiceType[]
    }>(`/`, params)
