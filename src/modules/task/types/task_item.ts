export type TaskItem = {
    id?: number
    name?: string
    description?: string | null
    status?: string
    priority?: number
    order?: number
    task_column_id?: number
    done?: boolean
}
