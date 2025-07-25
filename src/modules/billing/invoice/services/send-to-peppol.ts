import { HttpService } from '@billing/invoice/services'

export const sendToPeppol = async (id: number) => HttpService.post(`/${id}/send-to-peppol`, {})
