'use client'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'

import { SettingsBrevoFields } from './SettingBrevoFields'

export const BoxBrevo = () => {
    const queryMeta = useReadMeta('brevo_settings')

    const updateOrCreateMeta = useUpdateOrCreateMeta()

    const form = useForm<any>({
        values: queryMeta.data?.value
    })

    const onSubmit = (data: any) => {
        updateOrCreateMeta.mutate(
            {
                key: 'brevo_settings',
                value: data,
                type: 'json'
            },
            {
                onSuccess: () => {
                    toast.success('Les données de Brevo ont été mises à jour !')
                }
            }
        )
    }

    return (
        <Box isLoading={queryMeta.isLoading} title="Brevo">
            <Form useForm={form} onSubmit={onSubmit}>
                <SettingsBrevoFields />
                <Button isLoading={updateOrCreateMeta.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
