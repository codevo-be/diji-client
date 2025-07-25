import { HttpService } from '@billing/credit-note/services'

export const sendToPeppol = async (id: number) => HttpService.post(`/${id}/send-to-peppol`, {})
