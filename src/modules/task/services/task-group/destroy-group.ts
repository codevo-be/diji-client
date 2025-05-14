import { HttpService } from '.'

export const destroyGroup = async (data: { project_id: number; task_group_id: number; }) =>
    HttpService.delete(`/${data.project_id}/task/groups/${data.task_group_id}`)
