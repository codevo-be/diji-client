import { HttpService } from '@task/services'
import { ContactType } from '@contact/types/contact'
import { TaskItem } from '@task/types/task_item'

export const updateItem = async (data: ContactType) =>
    HttpService.put<{
        data: TaskItem
    }>(`/`, data)
