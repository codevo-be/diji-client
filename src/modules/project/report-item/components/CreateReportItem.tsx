import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateProjectReportItem } from '../hooks/mutations/useCreateProjectReportItem'

import { ReportItemFields } from './ReportItemFields'

import { Box } from '@/libs/Box'
import { Button } from '@/libs/button'
import { Form } from '@/libs/form'

export const CreateReportItem = () => {
    const { id, report_id } = useParams()
    const form = useForm()

    const mutationProjectReportItem = useCreateProjectReportItem()

    const handleSubmit = (data: FieldValues) => {
        mutationProjectReportItem.mutate(
            {
                project_id: Number(id),
                report_id: Number(report_id),
                ...data
            },
            {
                onSuccess: () => {
                    toast.success('Le rapport a été ajouté !')
                }
            }
        )
    }

    return (
        <Box>
            <h2 className="font-bold mb-12">Créer un rapport</h2>

            <Form useForm={form} onSubmit={handleSubmit}>
                <ReportItemFields />

                <Button isLoading={mutationProjectReportItem.isPending} type="submit">
                    Ajouter
                </Button>
            </Form>
        </Box>
    )
}
