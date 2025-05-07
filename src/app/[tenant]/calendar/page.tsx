'use client'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import frLocale from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useCreateCalendarEvent } from '@calendar/hooks/mutations/useCreateCalendarEvent'
import { useUpdateCalendarEvent } from '@calendar/hooks/mutations/useUpdateCalendarEvent'
import { useReadCalendarEvents } from '@calendar/hooks/queries/useReadCalendarEvents'
import { CalendarEvent } from '@calendar/types/calendar_event'

import { Modal } from '@components/modal/Modal'
import { useModal } from '@components/modal/useModal'

export default function Calendar() {

    const { setOpen, setData, data } = useModal()

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            start: '',
            end: ''
        }
    })
    const createCalendarEvent = useCreateCalendarEvent()
    const updateCalendarEvent = useUpdateCalendarEvent()
    const queryCalendarEvents = useReadCalendarEvents()

    const [events, setEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        if (queryCalendarEvents.data?.data) {
            setEvents(queryCalendarEvents.data.data)
        }
    }, [queryCalendarEvents.data])

    const formatForInput = (date: string | Date) => {
        const d = new Date(date)
        const pad = (n: number) => String(n).padStart(2, '0')
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    }

    const handleDateClick = (info: any) => {
        const defaultStart = info.dateStr
        const defaultEnd = info.allDay ? '' : info.dateStr

        setData({ mode: 'create', start: defaultStart, end: defaultEnd, allDay: info.allDay })
        form.reset({
            title: '',
            description: '',
            start: formatForInput(defaultStart),
            end: defaultEnd ? formatForInput(defaultEnd) : ''
        })
        setOpen(true)
    }

    const handleEventClick = (info: any) => {
        setData({ mode: 'edit', id: info.event.id })

        form.reset({
            title: info.event.title,
            description: info.event.extendedProps?.description || '',
            start: formatForInput(info.event.start),
            end: info.event.end ? formatForInput(info.event.end) : ''
        })
        setOpen(true)
    }

    const handleSubmit = (formData: FieldValues) => {
        if (data?.mode === 'create') {
            createCalendarEvent.mutate(
                {
                    title: formData.title,
                    description: formData.description,
                    start: formData.start,
                    end: formData.end || (data.allDay ? undefined : formData.start),
                    all_day: data.allDay ?? false
                },
                {
                    onSuccess: (res) => {
                        setEvents([...events, res.data])
                        setOpen(false)
                    }
                }
            )
            return
        }

        if (data?.mode === 'edit') {
            updateCalendarEvent.mutate(
                {
                    id: data.id,
                    title: formData.title,
                    description: formData.description,
                    start: formData.start,
                    end: formData.end,
                    all_day: data.allDay ?? false
                },
                {
                    onSuccess: (res) => {
                        const updated = events.map((e) => (e.id === data.id ? res.data : e))
                        setEvents(updated)
                        setOpen(false)
                    }
                }
            )
        }
    }

    const handleEventDrop = (info: any) => {
        updateCalendarEvent.mutate(
            {
                id: info.event.id,
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr,
                all_day: info.event.allDay ?? false
            },
            {
                onSuccess: (res) => {
                    const updated = events.map((e) =>
                        e.id === info.event.id ? res.data : e
                    )
                    setEvents(updated)
                }
            }
        )
    }

    const handleEventResize = (info: any) => {
        updateCalendarEvent.mutate(
            {
                id: info.event.id,
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr,
                all_day: info.event.allDay ?? false
            },
            {
                onSuccess: (res) => {
                    const updated = events.map((e) =>
                        e.id === info.event.id ? res.data : e
                    )
                    setEvents(updated)
                }
            }
        )
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={frLocale}
                firstDay={1}
                weekends={true}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                editable={true}
                selectable={true}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
            />

            <Modal>
                <Form useForm={form} onSubmit={handleSubmit}>
                    <Form.Field name="title" label="Titre" placeholder="Ex. Daily Standup" required />
                    <Form.Field name="description" label="Description" placeholder="Description optionnelle" />
                    <Form.Field name="start" label="Date de début" type="datetime-local" required />
                    <Form.Field name="end" label="Date de fin" type="datetime-local" />
                    <Button type="submit">Enregistrer</Button>
                </Form>
            </Modal>
        </>
    )
}
