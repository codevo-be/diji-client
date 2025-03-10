import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

import { SettingsBillingFields } from './SettingsBillingFields'

export const BoxBilling = () => {
    const { data, isSuccess } = useReadMeta('tenant_billing_details')

    const updateOrCreateMeta = useUpdateOrCreateMeta()
    const createUpload = useCreateUpload()

    const el = isSuccess ? data.value : { country: 'be' }

    const form = useForm({
        values: {
            //@ts-ignore
            ...el
        }
    })

    const onSubmit = ({ files, ...data }: FieldValues) => {
        updateOrCreateMeta.mutate({
            key: 'tenant_billing_details',
            value: data,
            type: 'json'
        })

        if (files) {
            const formData = new FormData()
            formData.append('file', files[0])

            createUpload.mutate(formData, {
                onSuccess: ({ data }) => {
                    updateOrCreateMeta.mutate({
                        key: 'tenant_logo',
                        value: data.url,
                        type: 'string'
                    })
                }
            })
        }
    }

    return (
        <Box title="Coordonnées de contact">
            <Form useForm={form} onSubmit={onSubmit}>
                <SettingsBillingFields />
                <Button type="submit">Sauvegarder</Button>
            </Form>
        </Box>
    )
}
