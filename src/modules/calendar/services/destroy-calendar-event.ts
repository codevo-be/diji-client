import { HttpService } from '@calendar//services'

export const destroyCalendarEvent = async (id: number) => HttpService.delete(`/${id}`)
