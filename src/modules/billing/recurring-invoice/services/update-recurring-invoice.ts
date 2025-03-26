import { RecurringInvoiceType } from '../types/recurring-invoice'

import { HttpService } from '.'

export const updateRecurringInvoice = async ({ id, ...data }: Partial<Omit<RecurringInvoiceType, 'id'>> & { id: RecurringInvoiceType['id'] }) =>
    HttpService.put<{
        data: RecurringInvoiceType
    }>(`/${id}`, data)
