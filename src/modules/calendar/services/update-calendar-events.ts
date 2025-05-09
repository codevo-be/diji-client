import { HttpService } from '@calendar/services'
import { CalendarEvent } from '@calendar/types/calendar_event'

export const updateCalendarEvent = async ({ id, ...data }: Partial<Omit<CalendarEvent, 'id'>> & { id: CalendarEvent['id'] }) =>
    HttpService.put<{
        data: CalendarEvent
    }>(`/${id}`, data)
