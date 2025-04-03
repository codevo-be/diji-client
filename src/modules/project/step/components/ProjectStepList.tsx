import { useParams } from 'next/navigation'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { toast } from 'sonner'

import { useDestroyProjectStep } from '../hooks/mutations/useDestroyProjectStep'
import { useUpdateProjectStep } from '../hooks/mutations/useUpdateProjectStep'
import { useReadProjectSteps } from '../hooks/queries/useReadProjectSteps'
import { ProjectStepType } from '../types/project-step.types'

import { Icon } from '@/components/Icon'
import { DndContainer } from '@/libs/Droppable'
import { queryClient } from '@/libs/react-query'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const ProjectStepList = () => {
    const { id: project_id } = useParams()
    const queryProjectSteps = useReadProjectSteps(Number(project_id))
    const destroyProjectStep = useDestroyProjectStep()
    const updateProjectStep = useUpdateProjectStep()

    const handleRemove = (step: ProjectStepType) => {
        const items = queryProjectSteps.data.items

        queryClient.setQueryData(['project-steps', {}], (oldData: any) => ({
            ...oldData,
            items: items.filter((item: ProjectStepType) => item.id !== step.id)
        }))

        destroyProjectStep.mutate(
            {
                project_id: Number(project_id),
                id: step.id
            },
            {
                onSuccess: () => {
                    toast.success("L'étape a été supprimée !")
                },
                onError: () => {
                    queryProjectSteps.refetch()
                }
            }
        )
    }

    const handleDrop = (e: DragEndEvent) => {
        if (!e.over) {
            return
        }

        const items = queryProjectSteps.data.items
        const draggedId = e.active.id
        const overId = e.over.id

        const draggedIndex = items.findIndex((step: ProjectStepType) => step.id === draggedId)
        const overIndex = items.findIndex((step: ProjectStepType) => step.id === overId)

        if (draggedIndex === overIndex) {
            return
        }

        const updatedItems = arrayMove(items, draggedIndex, overIndex)

        queryClient.setQueryData(['project-steps', {}], (oldData: any) => ({
            ...oldData,
            items: updatedItems
        }))

        updateProjectStep.mutate(
            {
                id: draggedId,
                order: overIndex + 1
            },
            {
                onSuccess: () => {
                    toast.success("L'ordre des étapes a été mis à jour !")
                    queryProjectSteps.refetch()
                }
            }
        )
    }

    return (
        <LoadingQuery query={queryProjectSteps}>
            {(data) => {
                return (
                    <DndContainer onDragEnd={handleDrop}>
                        <DndContainer.SortableContainer items={data.items}>
                            <ul className="flex flex-col gap-4">
                                {data.items.map((step: ProjectStepType) => {
                                    return (
                                        <DndContainer.SortableItem id={step.id} key={step.id}>
                                            <li className="bg-white border border-grey-400 rounded px-8 py-4 flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-8">
                                                    <DndContainer.ButtonSort className={'size-6'} id={step.id} />
                                                    <span>
                                                        {step.name} - {step.value}%
                                                    </span>
                                                </div>
                                                <button className="text-grey-600 transition-all hover:text-error" onClick={() => handleRemove(step)}>
                                                    <Icon name="cross" className="size-6 fill-current" />
                                                </button>
                                            </li>
                                        </DndContainer.SortableItem>
                                    )
                                })}
                            </ul>
                        </DndContainer.SortableContainer>
                    </DndContainer>
                )
            }}
        </LoadingQuery>
    )
}
