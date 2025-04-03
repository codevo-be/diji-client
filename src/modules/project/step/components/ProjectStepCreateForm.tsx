import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateProjectStep } from '../hooks/mutations/useCreateProjectStep'

import { Icon } from '@/components/Icon'
import { Button } from '@/libs/button'
import { Field, Form } from '@/libs/form'

export const ProjectStepCreateForm = () => {
    const { id } = useParams()

    const form = useForm({
        values: {
            category_id: Number(id)
        }
    })

    const mutationProjectStep = useCreateProjectStep()

    const handleSubmit = (data: FieldValues) => {
        mutationProjectStep.mutate(data, {
            onSuccess: () => {
                toast.success("L'étape du projet a été ajoutée !")
                form.reset()
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <div className="flex items-end gap-4">
                <Field className="flex-1" id="name" name="name" label="Ajouter une étape" placeholder="Option" />
                <Field className="flex-1" type="number" min={0} max={100} id="value" name="value" label="Ratio" placeholder="20%" />
                <Button isLoading={mutationProjectStep.isPending} className="!p-0 w-16 h-16 flex items-center justify-center">
                    <Icon name="cross" className="fill-white size-4 rotate-45" />
                </Button>
            </div>
        </Form>
    )
}
