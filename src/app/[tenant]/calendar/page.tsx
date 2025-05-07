'use client'

import { useState } from 'react'
import { FieldValues,useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import frLocale from '@fullcalendar/core/locales/fr'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import { Modal } from '@components/modal/Modal'
import { useModal } from '@components/modal/useModal'

export default function Calendar() {
    const [events, setEvents] = useState([])

    const { setOpen } = useModal()

    const form = useForm({
        defaultValues: {
            title: ''
        }
    })

    const handleDateClick = () => {
        form.reset()
        setOpen(true)
    }

    const handleEventClick = () => {
        form.reset()
        setOpen(true)
    }

    const handleEventDrop = (info: any) => {
        const updated = events.map((e) =>
            e.id === info.event.id
                ? {
                      ...e,
                      start: info.event.startStr,
                      end: info.event.endStr
                  }
                : e
        )
        setEvents(updated)
    }

    const handleEventResize = (info: any) => {
        const updated = events.map((e) =>
            e.id === info.event.id
                ? {
                      ...e,
                      start: info.event.startStr,
                      end: info.event.endStr
                  }
                : e
        )
        setEvents(updated)
    }

    const onSubmit = (data: FieldValues) => {
        setEvents([
            ...events,
            {
                id: Date.now().toString(),
                title: data.title,
                start: new Date().toISOString()
            }
        ])
        setOpen(false)
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
                <Form useForm={form} onSubmit={onSubmit}>
                    <Form.Field name="title" label="Titre" placeholder="Titre de l'événement" required />
                    <Button type="submit">Créer l'événement</Button>
                </Form>
            </Modal>
        </>
    )
}
