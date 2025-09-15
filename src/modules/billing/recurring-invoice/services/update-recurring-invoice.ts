import { RecurringInvoiceType } from '../types/recurring-invoice'

import { HttpService } from '.'

export const updateRecurringInvoice = async ({ id, ...data }: Partial<Omit<RecurringInvoiceType, 'id'>> & { id: RecurringInvoiceType['id'] }) => {
    if (data.contact_id === -1) { // Vérifie si le code est celui de la création.
        data.contact_id = undefined;
    }

    return HttpService.put<{
        data: RecurringInvoiceType
    }>(`/${id}`, data)
}
