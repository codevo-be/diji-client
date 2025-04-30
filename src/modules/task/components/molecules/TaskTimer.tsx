'use client'

import { useParams } from 'next/navigation'

import { useEffect } from 'react'
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
    const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({ autoStart: false })

    const updateTaskItem = useUpdateTaskItem()

    const getElapsedSeconds = () => {
        return hours * 3600 + minutes * 60 + seconds
    }

    const getTotalTime = () => {
        return initialTrackedTime + getElapsedSeconds()
    }

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


    const handleEdit = () => {
        // Todo : à modifier
        const input = prompt('Entrer le temps (HH:MM:SS)', '00:00:00')
        if (!input) return

        const [h, m, s] = input.split(':').map(Number)
        const customSeconds = h * 3600 + m * 60 + s

        updateTaskItem.mutate({
            project_id: Number(projectId),
            task_group_id: taskGroupId,
            id: taskId,
            tracked_time: customSeconds
        })
    }

    useEffect(() => {
        reset(new Date(), false)
    }, [reset, taskId])


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
                <button type="button" onClick={handleEdit} className="cursor-pointer">
                    <Icon name="edit" className="size-8 fill-current" />
                </button>
            </Grid.Col>
        </Grid>
    )
}
