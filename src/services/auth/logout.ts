import { HttpService } from '.'

export const logout = () => HttpService.post(`/auth/logout`, [])
