import { cookiesNext } from '@digico/utils'

import { TenantType } from 'types/tenant.types'
import { UserType } from 'types/user.types'

import { HttpService } from '.'

export const getAuthenticatedUser = async (tenant?: string) => {
    const cookie = await cookiesNext()

    return HttpService.setHeader({
        'X-Tenant': `${tenant ? tenant : cookie.get('X-tenant')}`
    }).get<{
        data: {
            user: UserType
            tenant: TenantType
        }
    }>(`/auth/user`)
}
