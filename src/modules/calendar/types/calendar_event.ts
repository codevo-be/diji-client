export type CalendarEvent = {
    id?: string
    title: string
    allDay?: boolean
    start: string
    end: string
    extendedProps?: {
        description?: string
    }
    description?: string
    all_day?: boolean
    assigned_user_ids?: number[]
    assigned_users?: {
        id: number
        firstname: string
        lastname: string
    }[]
}
