import { cookies } from 'next/headers'

import { HttpRequest } from '@digico/utils'

import { AuthResponse } from 'types/auth.types'

export const getAuthenticatedUser = async () => {
    const cookie = await cookies()

    return HttpRequest.setHeader({
        'X-Tenant': `${cookie.get('tenant')?.value}`,
        Authorization: `${cookie.get('access_token')?.value}`
    }).get<{
        data: AuthResponse
    }>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`)
}
