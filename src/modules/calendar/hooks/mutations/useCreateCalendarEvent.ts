'use client'

import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCalendarEvent } from '@calendar/services'


export const useCreateCalendarEvent = () => {
    return useMutation({
        mutationFn: createCalendarEvent,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['calendar-events']
            })

            toast.success("L'événement a été créé !")
        }
    })
}
