import { HttpService } from '@calendar/services'
import { CalendarEvent } from '@calendar/types/calendar_event'

export const createCalendarEvent = async (data: CalendarEvent) =>
    HttpService.post<{
        data: CalendarEvent
    }>(`/`, data)
