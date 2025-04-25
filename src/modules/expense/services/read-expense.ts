import { ExpenseType } from '@expense/type/expense'

import { HttpService } from './index'

export const readExpense = async (id: number): Promise<ExpenseType> => {
    const res = await HttpService.get<{ data: ExpenseType }>(`/${id}`)
    return res.data
}
