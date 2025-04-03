import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useDestroyProjectReportItem } from '../hooks/mutations/useDestroyProjectReportItem'
import { useUpdateProjectReportItem } from '../hooks/mutations/useUpdateProjectReportItem'
import { ProjectReportItemType } from '../types/project-report-item.types'

import { ReportItemFields } from './ReportItemFields'

import { Box } from '@/libs/Box'
import { Button } from '@/libs/button'
import { DndContainer } from '@/libs/Droppable'
import { Form } from '@/libs/form'

type Props = {
    item: ProjectReportItemType
}

export const UpdateReportItem = ({ item }: Props) => {
    const { id, report_id } = useParams()
    const form = useForm({
        values: item
    })

    const mutationProjectReportItem = useUpdateProjectReportItem()
    const destroyProjectReportItem = useDestroyProjectReportItem()

    const handleSubmit = (data: FieldValues) => {
        mutationProjectReportItem.mutate(
            {
                project_id: Number(id),
                report_id: Number(report_id),
                ...data
            },
            {
                onSuccess: () => {
                    toast.success('Rapport mis à jour !')
                }
            }
        )
    }

    const handleRemove = (item: ProjectReportItemType) => {
        destroyProjectReportItem.mutate({
            project_id: Number(id),
            report_id: Number(report_id),
            id: item.id
        })
    }

    return (
        <DndContainer.SortableItem id={item.id} key={item.id}>
            <Box className="flex items-center gap-4">
                <DndContainer.ButtonSort className={'size-6'} id={item.id} />
                <div className="w-full">
                    <h2 className="text-md mb-8 font-bold">{`Rapport ${item.order}`}</h2>
                    <Form useForm={form} onSubmit={handleSubmit}>
                        <ReportItemFields />
                        <div className="flex gap-4">
                            <Button isLoading={mutationProjectReportItem.isPending} type="submit">
                                Mettre à jour
                            </Button>
                            <Button type="button" isLoading={destroyProjectReportItem.isPending} onClick={() => handleRemove(item)} intent={'error'}>
                                Supprimer
                            </Button>
                        </div>
                    </Form>
                </div>
            </Box>
        </DndContainer.SortableItem>
    )
}
