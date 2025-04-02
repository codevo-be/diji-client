'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useUpdateSupplier } from '../hooks/supplier/mutations/useUpdateSupplier'
import { useReadSupplier } from '../hooks/supplier/queries/useReadSupplier'
import { SupplierType } from '../types/supplier.types'

import {TaskColumnFields} from './form/TaskColumnFields'

import { Button } from '@/libs/button'
import { Form } from '@/libs/form'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const SupplierUpdateForm = () => {
    const { id } = useParams()

    const querySupplier = useReadSupplier(Number(id))
    const { mutate, isPending } = useUpdateSupplier()

    const form = useForm({
        values: querySupplier.data
    })

    const handleSubmit = (data: SupplierType) => {
        mutate(data, {
            onSuccess: () => {
                toast.success('Le fournisseur a été modifié !')
            }
        })
    }

    return (
        <LoadingQuery query={querySupplier}>
            {() => {
                return (
                    <Form useForm={form} onSubmit={handleSubmit}>
                        <TaskColumnFields />
                        <Button isLoading={isPending} type="submit">
                            Sauvegarder
                        </Button>
                    </Form>
                )
            }}
        </LoadingQuery>
    )
}
