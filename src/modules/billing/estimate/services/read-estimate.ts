import { EstimateType } from '../types/estimate'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { ContactType } from '@contact/types/contact'

import { HttpService } from '.'

export const readEstimate = async (id: number, params?: Record<string, any>) => {
    return HttpService.get<{
        data: EstimateType & {
            items?: BillingItemType[]
            contact?: ContactType
        }
    }>(`/${id}`, params).then((response) => {
        return response.data
    })
}
