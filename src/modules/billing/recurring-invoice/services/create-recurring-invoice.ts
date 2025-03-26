import { RecurringInvoiceType } from '../types/recurring-invoice'

import { HttpService } from '.'

export const createRecurringInvoice = async (data: Partial<Omit<RecurringInvoiceType, 'id'>>) =>
    HttpService.post<{
        data: RecurringInvoiceType
    }>(`/`, data)
