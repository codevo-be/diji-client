import { HttpService } from '@billing/invoice/services'
import { InvoiceType } from '@billing/invoice/types/invoice'

export const updateInvoice = async ({ id, ...data }: Partial<Omit<InvoiceType, 'id'>> & { id: InvoiceType['id'] }) => {
    if (data.contact_id === -1) { // Vérifie si le code est celui de la création.
        data.contact_id = undefined;
    }

    return HttpService.put<{
        data: InvoiceType
    }>(`/${id}`, data)
}

