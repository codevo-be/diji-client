import { TenantType } from '../../types/tenant.types'

import { HttpService } from '.'

export const readTenant = async () =>
    HttpService.get<{
        data: TenantType
    }>(`/`)
