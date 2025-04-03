import { useParams } from 'next/navigation'

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { toast } from 'sonner'

import { useUpdateProjectReportItem } from '../hooks/mutations/useUpdateProjectReportItem'
import { useReadProjectReportItems } from '../hooks/queries/useReadProjectReportItems'
import { ProjectReportItemType } from '../types/project-report-item.types'

import { UpdateReportItem } from './UpdateReportItem'

import { DndContainer } from '@/libs/Droppable'
import { queryClient } from '@/libs/react-query'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const ReportItemList = () => {
    const { id, report_id } = useParams()
    const queryProjectReportItems = useReadProjectReportItems(Number(id), Number(report_id))

    const mutationProjectReportItem = useUpdateProjectReportItem()

    const handleDrop = (e: DragEndEvent) => {
        if (!e.over) {
            return
        }

        const items = queryProjectReportItems.data.items
        const draggedId = e.active.id
        const overId = e.over.id

        const draggedIndex = items.findIndex((step: ProjectReportItemType) => step.id === draggedId)
        const overIndex = items.findIndex((step: ProjectReportItemType) => step.id === overId)

        if (draggedIndex === overIndex) {
            return
        }

        const updatedItems = arrayMove(items, draggedIndex, overIndex)

        queryClient.setQueryData(['project-report-items', {}], (oldData: any) => ({
            ...oldData,
            items: updatedItems
        }))

        mutationProjectReportItem.mutate(
            {
                id: draggedId,
                project_id: Number(id),
                report_id: Number(report_id),
                order: overIndex + 1
            },
            {
                onSuccess: () => {
                    toast.success("L'ordre des rapports a été mis à jour !")
                    queryProjectReportItems.refetch()
                }
            }
        )
    }

    return (
        <LoadingQuery query={queryProjectReportItems}>
            {(data) => {
                return (
                    <DndContainer onDragEnd={handleDrop}>
                        <DndContainer.SortableContainer items={data.items}>
                            <div className="flex flex-col gap-4">
                                {(data.items ?? []).map((item: ProjectReportItemType) => {
                                    return <UpdateReportItem key={item.id} item={item} />
                                })}
                            </div>
                        </DndContainer.SortableContainer>
                    </DndContainer>
                )
            }}
        </LoadingQuery>
    )
}
