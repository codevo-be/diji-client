'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateCalendarEvent } from '@calendar/services/update-calendar-events'

export const useUpdateCalendarEvent = () => {
    return useMutation({
        mutationFn: updateCalendarEvent,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['calendar-events']
            })
            toast.success("L'événement a été modifié !")
        }
    })
}
