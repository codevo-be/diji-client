'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'
import { useStopwatch } from 'react-timer-hook'
import { Grid } from '@digico/ui'

import { useUpdateTaskItem } from '@task/hooks/task-item/mutations/useUpdateTaskItem'

import { Icon } from '@components/Icon'

type TaskTimerProps = {
    taskId: number
    initialTrackedTime: number
    taskGroupId: number
}

export const TaskTimer = ({ taskId, initialTrackedTime, taskGroupId }: TaskTimerProps) => {
    const { id: projectId } = useParams()
    const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false })
    const [accumulated, setAccumulated] = useState(initialTrackedTime)

    const updateTaskItem = useUpdateTaskItem()

    const getElapsedSeconds = () => {
        return hours * 3600 + minutes * 60 + seconds
    }

    const getTotalTime = () => {
        return isRunning ? accumulated + getElapsedSeconds() : accumulated
    }

    const handleStart = () => {
        start()
    }

    const handlePause = () => {
        pause()

        const additional = getElapsedSeconds()
        const total = accumulated + additional

        updateTaskItem.mutate(
            {
                project_id: Number(projectId),
                task_group_id: taskGroupId,
                id: taskId,
                tracked_time: total,
            },
            {
                onSuccess: () => {
                    setAccumulated(total)
                },
                onError: () => {
                    // on ne touche à rien, le chrono est en pause avec la bonne valeur en mémoire
                },
            }
        )
    }

    const total = getTotalTime()
    const hoursPart = Math.floor(total / 3600)
    const minutesPart = Math.floor((total % 3600) / 60)
    const secondsPart = total % 60

    return (
        <Grid>
            <Grid.Col column={2}>
                {String(hoursPart).padStart(2, '0')}:
                {String(minutesPart).padStart(2, '0')}:
                {String(secondsPart).padStart(2, '0')}
            </Grid.Col>
            <Grid.Col column={10}>
                {!isRunning ? (
                    <button type="button" onClick={handleStart} className="cursor-pointer">
                        <Icon name="play" className="size-10 fill-current" />
                    </button>
                ) : (
                    <button type="button" onClick={handlePause} className="cursor-pointer">
                        <Icon name="pause" className="size-10 fill-current" />
                    </button>
                )}
            </Grid.Col>
        </Grid>
    )
}
