import { HttpService } from '.'

export const readRegisterToken = async (token: string) =>
    HttpService.get<{ token: string; email: string }>(`/auth/registration-link/${token}`)
