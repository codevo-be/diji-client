import { EstimateType } from '../types/estimate'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'
import { ContactType } from '@contact/types/contact'
import { PaginateType } from 'types/paginate'

import { HttpService } from '.'

export const readEstimates = async (
    params?: Record<string, any>
): Promise<{
    meta: PaginateType
    data: (EstimateType & {
        items?: BillingItemType[]
        contact?: ContactType
    })[]
}> => HttpService.get(`/`, params)
