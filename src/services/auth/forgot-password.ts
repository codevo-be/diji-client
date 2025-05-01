import { HttpService } from '.'

export const forgotPassword = async (data: { email: string }) => {
    return await HttpService.post('/auth/forgot-password', data)
}
