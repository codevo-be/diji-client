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
}