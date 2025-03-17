'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

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
                //@ts-ignore
                url: queryMeta.data?.value?.logo ?? ''
            }
        }
    })

    const onSubmit = async ({ logo, ...data }: FieldValues) => {
        try {
            data.logo = logo?.url ?? ''

            if (logo?.file) {
                const formData = new FormData()
                formData.append('file', logo.file)

                const uploadedLogo = await new Promise((resolve) => {
                    createUpload.mutate(formData, {
                        onSuccess: ({ data: el }) => resolve(el.url)
                    })
                })

                data.logo = uploadedLogo
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
                <SettingsBillingFields />
                <Button isLoading={updateOrCreateMeta.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
