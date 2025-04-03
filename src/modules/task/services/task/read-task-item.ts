import { HttpService } from '@tasks/services/task/index'

type Props = {
    with?: ['contacts'],
    task_column_id: number
}

export const readTaskItem = async (params: Props) => {
    const data = await HttpService.get(`/api/task-columns/${params.task_column_id}/task-items`, params)
    return {
        items: data,
    }
}
