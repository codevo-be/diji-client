'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { destroyCalendarEvent } from '@calendar/services/destroy-calendar-event'


export const useDestroyCalendarEvent = () => {
    return useMutation({
        mutationFn: destroyCalendarEvent,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['calendar-events']
            })
            toast.success("L'évenement a été supprimé !")
        }
    })
}
