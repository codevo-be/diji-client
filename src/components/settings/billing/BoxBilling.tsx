'use client'

import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateTenant } from '../../../hooks/mutations/tenant'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

import { SettingsBillingFields } from './SettingsBillingFields'

export const BoxBilling = () => {
    const queryMeta = useReadMeta('tenant_billing_details')

    const updateTenant = useUpdateTenant()
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

                data.logo = await new Promise((resolve) => {
                    createUpload.mutate(formData, {
                        onSuccess: ({ data: el }) => resolve(el.url)
                    })
                })
            }

            updateTenant.mutate(
                { settings: data },
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
                <Button isLoading={updateTenant.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
