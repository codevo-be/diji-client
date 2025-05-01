import { HttpService } from '.'

export const resetPassword = async (data: { token: string; email: string; password: string; password_confirmation: string }) => {
    return await HttpService.post('/reset-password', data)
}
