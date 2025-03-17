'use client'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

import { SettingsBillingFields } from './SettingsBillingFields'

export const BoxBilling = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { data: tenant_billing_details, isLoading: isLoadingData } = useReadMeta('tenant_billing_details')
    const { data: tenant_logo, isLoading: isLoadingLogo } = useReadMeta('tenant_logo')

    useEffect(() => {
        if (!isLoadingData && !isLoadingLogo) {
            setIsLoading(false)
        }
    }, [isLoadingData, isLoadingLogo])

    const updateOrCreateMeta = useUpdateOrCreateMeta()
    const createUpload = useCreateUpload()

    const form = useForm({
        values: {
            ...(tenant_billing_details
                ? //@ts-ignore
                  { ...(tenant_billing_details.value ?? {}) }
                : {
                      country: 'be'
                  }),
            logo: {
                url: tenant_logo?.value
            }
        }
    })

    const onSubmit = ({ logo, ...data }: FieldValues) => {
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

        if (logo && logo.file) {
            const formData = new FormData()
            formData.append('file', logo.file)

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
        <Box isLoading={isLoading} title="Coordonnées de contact">
            <Form useForm={form} onSubmit={onSubmit}>
                <SettingsBillingFields />
                <Button isLoading={updateOrCreateMeta.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
