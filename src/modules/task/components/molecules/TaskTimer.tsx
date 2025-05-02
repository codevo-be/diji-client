'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useStopwatch } from 'react-timer-hook'
import { Form, Grid } from '@digico/ui'

import { Icon } from '@components/Icon'

type TaskTimerProps = {
    taskId: number
    initialTrackedTime: number
    taskGroupId: number
}

export const TaskTimer = ({ taskId, initialTrackedTime }: TaskTimerProps) => {
    // Todo : quand on modifie le temps a la main, l'afficher en direct dans le timer.

    const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({ autoStart: false })
    const [isEditing, setIsEditing] = useState(false)

    const { setValue, watch, formState } = useFormContext()
    const timeValue = watch('tracked_time')

    const getElapsedSeconds = () => hours * 3600 + minutes * 60 + seconds
    const getTotalTime = () => initialTrackedTime + getElapsedSeconds()

    const handlePause = () => {
        pause()
        const additional = getElapsedSeconds()
        const total = initialTrackedTime + additional

        const h = Math.floor(total / 3600)
        const m = Math.floor((total % 3600) / 60)
        const s = total % 60

        setValue('tracked_time', `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }

    const total = getTotalTime()
    const hoursPart = Math.floor(total / 3600)
    const minutesPart = Math.floor((total % 3600) / 60)
    const secondsPart = total % 60

    // A chaque changement d'id de tâche, on remet le timer avec le temps initial
    useEffect(() => {
        const totalSeconds = initialTrackedTime
        const date = new Date()
        date.setHours(0, 0, 0, 0)
        date.setSeconds(totalSeconds)

        reset(date, false)
        setIsEditing(false)
    }, [initialTrackedTime, reset, taskId])

    // Par défaut, cacher le champ de saisie
    useEffect(() => {
        if (formState.isSubmitting) {
            setIsEditing(false)
        }
    }, [formState.isSubmitting])

    return (
        <>
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
                    <button
                        type="button"
                        onClick={() => {
                            const tracked = watch('tracked_time')

                            if (tracked && typeof tracked === 'string' && tracked.includes(':')) {
                                setValue('tracked_time', tracked)
                            } else {
                                const h = Math.floor(initialTrackedTime / 3600)
                                const m = Math.floor((initialTrackedTime % 3600) / 60)
                                const s = initialTrackedTime % 60

                                setValue('tracked_time', `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
                            }

                            setIsEditing(true)
                        }}
                        className="cursor-pointer">
                        <Icon name="edit" className="size-8 fill-current" />
                    </button>
                </Grid.Col>
            </Grid>

            {isEditing && (
                <div className="mt-4">
                    <Form.Field label="Temps (HH:MM:SS)" name="tracked_time" type="time" step={1} defaultValue={timeValue} />
                </div>
            )}
        </>
    )
}
