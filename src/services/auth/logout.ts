import { HttpRequest } from '@digico/utils'

export const logout = () => {
    return HttpRequest.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, [])
}
