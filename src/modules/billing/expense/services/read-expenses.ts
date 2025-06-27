import { ContactType } from '@contact/types/contact'

import { HttpService } from './index'

export const readExpenses = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: ContactType[]
    }>(`/`, params)
