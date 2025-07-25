import { TenantType } from '../../types/tenant.types'

import { HttpService } from '.'

export const updateTenant = async (data: Partial<TenantType>) =>
    HttpService.put<{ data: TenantType }>('/', data)
