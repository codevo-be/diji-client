'use client'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form, ImageBuilder } from '@digico/ui'
import { toast } from 'sonner'

import useDeleteUpload from '../../../hooks/mutations/upload/useDeleteUpload'
import useGetUpload from '../../../hooks/queries/upload/useGetUpload'
import { useUpdateOrCreateMeta } from 'hooks/mutations/meta/useUpdateOrCreateMeta'
import { useCreateUpload } from 'hooks/mutations/upload'
import { useReadMeta } from 'hooks/queries/meta/useReadMeta'
import { UploadType } from '../../../types/upload.types'

import DropFiles from '@components/upload/DropFiles'

import { SettingsBillingFields } from './SettingsBillingFields'

export const BoxBilling = () => {
    const queryMeta = useReadMeta('tenant_billing_details')

    const [logo, setLogo] = useState<UploadType | undefined>(undefined);

    const updateOrCreateMeta = useUpdateOrCreateMeta()
    const { data: uploads, isLoading } = useGetUpload('metas', 'tenant_billing_details');
    const createUpload = useCreateUpload()
    const deleteUpload = useDeleteUpload();

    const form = useForm({
        values: {
            ...(queryMeta.data
                ? //@ts-ignore
                  { ...(queryMeta.data.value ?? {}) }
                : {
                      country: 'be'
                  }),
        }
    })

    const onDeleteImage = () => {
        deleteUpload.mutate(String(logo?.id));
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            const hasLogo = data.logo && data.logo[0]?.file;

            if (hasLogo) {
                const file = data.logo[0].file
                const formData = new FormData();
                formData.append('model', 'metas');
                formData.append('model_id', 'tenant_billing_details');
                formData.append('files[]', file)
                formData.append('name', 'tenantLogo')

                createUpload.mutate(formData, {
                    onSuccess: () => {
                        form.resetField('logo')
                    }
                })

                delete data.logo
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
        } catch (error: any) {
            toast.error('Erreur lors de la sauvegarde !')
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (isLoading || !uploads) return;

        setLogo(uploads[0]);
    }, [uploads, isLoading])

    return (
        <Box isLoading={queryMeta.isLoading} title="Coordonnées de contact">
            <Form useForm={form} onSubmit={onSubmit}>
                {logo &&
                    <div className={"flex flex-col items-center gap-4 self-center"}>
                        <div className={"w-[15rem] aspect-square rounded overflow-hidden"}>
                            <ImageBuilder src={logo.url} />

                        </div>


                        <Button type={"button"} onClick={onDeleteImage}>Supprimer</Button>
                    </div>
                }
                <DropFiles name={"logo"} />

                <SettingsBillingFields />
                <Button isLoading={updateOrCreateMeta.isPending} type="submit">
                    Sauvegarder
                </Button>
            </Form>
        </Box>
    )
}
