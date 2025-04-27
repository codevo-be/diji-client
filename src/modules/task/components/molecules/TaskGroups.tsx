import { useParams } from 'next/navigation'

import { useReadTaskGroups } from '@task/hooks/task-group/queries/useReadTaskGroups'

import { TaskGroup } from './TaskGroup'

export const TaskGroups = () => {
    const { id } = useParams()

    const queryTaskGroups = useReadTaskGroups(Number(id), {
        include: ['items']
    })

    return (
        <div className="w-full flex flex-col gap-4">
            {(queryTaskGroups.data?.data ?? []).map((group) => {
                return <TaskGroup key={group.id} group={group} />
            })}
        </div>
    )
}
