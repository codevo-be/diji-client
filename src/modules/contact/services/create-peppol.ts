import { HttpRequestBuilder } from '@digico/utils'

import { PeppolType } from '@contact/types/peppol'

export const createPeppol = async (data: PeppolType) =>
    new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/peppol/hook').post<{
        data: PeppolType
    }>(`/`, data)
