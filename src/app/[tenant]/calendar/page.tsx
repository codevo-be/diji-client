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
import { useDestroyCalendarEvent } from '@calendar/hooks/mutations/useDestroyCalendarEvent'
import { useUpdateCalendarEvent } from '@calendar/hooks/mutations/useUpdateCalendarEvent'
import { useReadCalendarEvents } from '@calendar/hooks/queries/useReadCalendarEvents'
import { useReadProjects } from '@project/hooks/queries'
import { useReadUsers } from '@task/hooks/user/queries/useReadUsers'
import { CalendarEvent } from '@calendar/types/calendar_event'

import { Modal } from '@components/modal/Modal'
import { useModal } from '@components/modal/useModal'
import { SelectMultiUser } from '@task/components/organisms/SelectMultiUser'

export default function Calendar() {
    const { setOpen, setData, data } = useModal()
    const { data: users } = useReadUsers()
    const { data: projectResponse } = useReadProjects({ page: 1 })
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            start: '',
            end: '',
            assigned_user_ids: []
        }
    })

    const createCalendarEvent = useCreateCalendarEvent()
    const updateCalendarEvent = useUpdateCalendarEvent()
    const deleteCalendarEvent = useDestroyCalendarEvent()
    const queryCalendarEvents = useReadCalendarEvents()

    const [events, setEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        const calendarEvents = queryCalendarEvents.data?.data ?? []

        const projectEvents =
            projectResponse?.data
                .filter((p) => p.start_date || p.end_date)
                .map((p) => {
                    const start = p.start_date ?? p.end_date ?? ''
                    const endRaw = p.end_date ?? p.start_date ?? ''
                    const end = new Date(endRaw)
                    end.setDate(end.getDate() + 1)

                    return {
                        id: `project-${p.id}`,
                        title: `[Projet] ${p.name}`,
                        start,
                        end: end.toISOString().split('T')[0],
                        allDay: true,
                        backgroundColor: '#6c5ce7',
                        borderColor: '#6c5ce7'
                    }
                }) ?? []

        setEvents([...calendarEvents, ...projectEvents])
    }, [queryCalendarEvents.data, projectResponse])


    const formatForInput = (date: string | Date) => {
        const d = new Date(date)
        const pad = (n: number) => String(n).padStart(2, '0')
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    }

    const handleDateClick = (info: any) => {
        setData({ mode: 'create', start: info.dateStr, end: '', allDay: info.allDay })
        form.reset({
            title: '',
            description: '',
            start: formatForInput(info.dateStr),
            end: '',
            assigned_user_ids: []
        })
        setOpen(true)
    }

    const handleEventClick = (info: any) => {
        if (info.event.id?.toString().startsWith('project-')) return

        const assignedIds = info.event.extendedProps?.assigned_user_ids ?? []

        setData({ mode: 'edit', id: info.event.id })
        form.reset({
            title: info.event.title,
            description: info.event.extendedProps?.description || '',
            start: formatForInput(info.event.start),
            end: info.event.end ? formatForInput(info.event.end) : '',
            assigned_user_ids: assignedIds
        })
        setOpen(true)
    }

    const handleSubmit = (formData: FieldValues) => {
        const allDay = false
        const payload = {
            title: formData.title,
            description: formData.description,
            start: formData.start,
            end: formData.end || (allDay ? undefined : formData.start),
            all_day: allDay,
            assigned_user_ids: formData.assigned_user_ids
        }

        if (data?.mode === 'create') {
            createCalendarEvent.mutate(payload, {
                onSuccess: (res) => {
                    setEvents([...events, res.data])
                    setOpen(false)
                }
            })
        } else if (data?.mode === 'edit') {
            updateCalendarEvent.mutate(
                { id: data.id, ...payload },
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

    const handleDelete = () => {
        if (!data?.id) return

        deleteCalendarEvent.mutate(data.id, {
            onSuccess: () => {
                setEvents(events.filter((e) => e.id !== data.id))
                setOpen(false)
            }
        })
    }

    const handleEventDrop = (info: any) => {
        if (info.event.id?.toString().startsWith('project-')) return

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
                    const updated = events.map((e) => (e.id === info.event.id ? res.data : e))
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
                weekends
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventDrop}
                editable
                selectable
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
                    <SelectMultiUser
                        name="assigned_user_ids"
                        label="Utilisateurs assignés"
                        control={form.control}
                        options={
                            users?.data.map((user: any) => ({
                                value: user.id,
                                label: `${user.firstname} ${user.lastname}`
                            })) ?? []
                        }
                    />

                    <div className="flex flex-col gap-2 mt-4">
                        <Button type="submit" className="w-full">
                            Enregistrer
                        </Button>
                        {data?.mode === 'edit' && (
                            <Button type="button" intent="error" className="w-full" onClick={handleDelete}>
                                Supprimer
                            </Button>
                        )}
                    </div>
                </Form>
            </Modal>
        </>
    )
}
