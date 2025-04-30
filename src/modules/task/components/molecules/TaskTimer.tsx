'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useStopwatch } from 'react-timer-hook'
import { Grid, Form, Button } from '@digico/ui'
import { useForm, FieldValues } from 'react-hook-form'

import { useUpdateTaskItem } from '@task/hooks/task-item/mutations/useUpdateTaskItem'
import { Icon } from '@components/Icon'
import { Modal } from '@helpers/Modal'

type TaskTimerProps = {
    taskId: number
    initialTrackedTime: number
    taskGroupId: number
}

export const TaskTimer = ({ taskId, initialTrackedTime, taskGroupId }: TaskTimerProps) => {
    const { id: projectId } = useParams()
    const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false })

    const updateTaskItem = useUpdateTaskItem()

    const getElapsedSeconds = () => hours * 3600 + minutes * 60 + seconds

    const getTotalTime = () => initialTrackedTime + getElapsedSeconds()

    const handlePause = () => {
        pause()
        const additional = getElapsedSeconds()

        updateTaskItem.mutate({
            project_id: Number(projectId),
            task_group_id: taskGroupId,
            id: taskId,
            tracked_time: initialTrackedTime + additional
        })
    }

    const total = getTotalTime()
    const hoursPart = Math.floor(total / 3600)
    const minutesPart = Math.floor((total % 3600) / 60)
    const secondsPart = total % 60

    const form = useForm({
        defaultValues: {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    })

    const handleCustomTimeSubmit = (data: FieldValues, close: () => void) => {
        const h = Number(data.hours || 0)
        const m = Number(data.minutes || 0)
        const s = Number(data.seconds || 0)

        const totalSeconds = h * 3600 + m * 60 + s

        updateTaskItem.mutate({
            project_id: Number(projectId),
            task_group_id: taskGroupId,
            id: taskId,
            tracked_time: totalSeconds
        })

        close()
    }

    return (
        <Grid>
            <Grid.Col column={9} className="flex items-center gap-4">
                {!isRunning ? (
                    <button type="button" onClick={start} className="cursor-pointer">
                        <Icon name="play" className="size-8 fill-current" />
                    </button>
                ) : (
                    <button type="button" onClick={handlePause} className="cursor-pointer">
                        <Icon name="pause" className="size-8 fill-current" />
                    </button>
                )}
                <span>
                    {String(hoursPart).padStart(2, '0')}:{String(minutesPart).padStart(2, '0')}:{String(secondsPart).padStart(2, '0')}
                </span>
            </Grid.Col>

            <Grid.Col column={3} className="flex justify-end items-center">
                <Modal>
                    <Modal.Trigger>
                        <button type="button" className="cursor-pointer">
                            <Icon name="edit" className="size-8 fill-current" />
                        </button>
                    </Modal.Trigger>
                    <Modal.Content>
                        {({ handleClose }) => (
                            <Form useForm={form} onSubmit={(data) => handleCustomTimeSubmit(data, handleClose)}>
                                <Form.Field
                                    name="Temps"
                                    type="time"
                                    label="Heures"
                                    placeholder="0"
                                    min={0}
                                />
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button type="button" onClick={handleClose} intent="secondary">
                                        Annuler
                                    </Button>
                                    <Button type="submit">Valider</Button>
                                </div>
                            </Form>
                        )}
                    </Modal.Content>
                </Modal>
            </Grid.Col>
        </Grid>
    )
}
