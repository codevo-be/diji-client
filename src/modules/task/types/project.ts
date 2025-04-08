export type ProjectType = {
    id: number
    name: string
    description: string
    order: number
    project_id: number
    items: {
        id: number
        name: string
        description: string | null
        status: string
        priority: number
        order: number
    }[]
}
