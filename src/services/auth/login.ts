import { HttpRequest } from '@digico/utils'

import { AuthResponse, LoginFormData } from 'types/auth.types'

export const login = (data: LoginFormData) => {
    return HttpRequest.post<{
        data: AuthResponse
    }>(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data)
}
