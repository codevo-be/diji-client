import { RegisterFormData } from 'types/auth.types'

import { HttpService } from '.'

export const register = (data: RegisterFormData) => HttpService.post(`/auth/register`, data)
