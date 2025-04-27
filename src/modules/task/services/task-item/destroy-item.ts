import { HttpService } from '.'

export const destroyItem = async (data: { project_id: number; task_group_id: number; id: number }) =>
    HttpService.delete(`/${data.project_id}/task/groups/${data.task_group_id}/items/${data.id}`)
