import { HttpService } from '@calendar/services'
import { CalendarEvent } from '@calendar/types/calendar_event'
import { PaginateType } from 'types/paginate'

export const readCalendarEvents = async (params?: Record<string, any>) =>
    HttpService.get<{
        data: CalendarEvent[]
        meta: PaginateType
    }>(`/`, params)
