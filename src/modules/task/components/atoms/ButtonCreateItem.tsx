import { useParams } from 'next/navigation'

import { Button } from '@digico/ui'

import { useCreateTaskGroup } from '@task/hooks/task-group/mutations/useCreateTaskGroup'

export const ButtonCreateItem = () => {
    const { id } = useParams()

    const createGroup = useCreateTaskGroup()

    const onCreateList = () => {
        createGroup.mutate({
            project_id: Number(id),
            name: 'Nouvelle liste'
        })
    }

    return (
        <Button onClick={onCreateList} isLoading={createGroup.isPending}>
            Nouvelle liste
        </Button>
    )
}
