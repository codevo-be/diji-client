import { UserType } from '@task/types/user'
import { PaginateType } from 'types/paginate'

import { HttpService } from '.'

export const readUsers = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: UserType[]
        meta: PaginateType
    }>(`/`, params)
