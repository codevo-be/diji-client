import { TaskItemType } from './task-item'

export type TaskGroupType = {
    id: number
    project_id: number
    name: string
    position: number
    items?: TaskItemType[]
}
