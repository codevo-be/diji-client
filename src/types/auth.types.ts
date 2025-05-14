import { TenantType } from './tenant.types'
import { UserType } from './user.types'

export interface LoginFormData {
    email: string
    password: string
    remember: boolean
}

export interface RegisterFormData {
    email: string
    password: string
    company: string
}

export interface AuthResponse {
    access_token: string
    expires_in: number
    token_type: 'Bearer' | 'JWT'
    user: UserType
    tenant: TenantType
}
