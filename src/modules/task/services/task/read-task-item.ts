import { httpService } from '@/utils/httpService'

type Props = {
    with?: ['contacts'],
    task_column_id: number
}

export const readTaskItem = async (params: Props) => {
    const data = await httpService.get(`/api/task-columns/${params.task_column_id}/task-items`, params)
    return {
        items: data,
    }
}
