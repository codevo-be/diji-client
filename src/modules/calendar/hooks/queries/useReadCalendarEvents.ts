'use client'

import { useQuery } from '@tanstack/react-query'

import { readCalendarEvents } from '@calendar/services/read-calendar-events'


export const useReadCalendarEvents = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['calendar-events', { ...params }],
        queryFn: () => readCalendarEvents(params),
        placeholderData: (previousData) => previousData
    })
}
