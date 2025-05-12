'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

import DropFiles from '@components/upload/DropFiles'

import { SettingsBillingFields } from './SettingsBillingFields'

export const BoxBilling = () => {
    const queryMeta = useReadMeta('tenant_billing_details')

    const updateOrCreateMeta = useUpdateOrCreateMeta()
    const createUpload = useCreateUpload()


    const form = useForm({
        values: {
            ...(queryMeta.data
                ? //@ts-ignore
                  { ...(queryMeta.data.value ?? {}) }
                : {
                      country: 'be'
                  }),
            logo: {
                url: ''
            }
        }
    })

    const onSubmit = async (data: FieldValues) => {
        try {
            if (data.logo[0]) {
                const file = data.logo[0].file
                const formData = new FormData();
                formData.append('model', 'metas');
                formData.append('model_id', 'tenant_billing_details');
                formData.append('files[]', file)

                createUpload.mutate(formData, {
                    onSuccess: () => {
                        form.reset('logo')
                    }
                })
            }

            updateOrCreateMeta.mutate(
                {
                    key: 'tenant_billing_details',
                    value: data,
                    type: 'json'
                },
                {
                    onSuccess: () => {
                        toast.success('Coordonnées mises à jour !')
                    }
                }
            )
        } catch {
            toast.error('Erreur lors du téléchargement du logo !')
        }
    }

    return (
        <Box isLoading={queryMeta.isLoading} title="Coordonnées de contact">
            <Form useForm={form} onSubmit={onSubmit}>
                <div className={"flex flex-col items-center gap-4 self-center"}>
                    <div className={"bg-error w-20 h-20"}>

                    </div>

                    <Button type={"button"}>Supprimer</Button>
                </div>
                <DropFiles name={"logo"} />

                <SettingsBillingFields />
                <Button isLoading={updateOrCreateMeta.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
