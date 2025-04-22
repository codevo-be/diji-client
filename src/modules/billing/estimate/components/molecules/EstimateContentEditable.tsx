import { useParams } from 'next/navigation'

import { FieldValues } from 'react-hook-form'
import { queryClient } from '@digico/utils'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'sonner'

import { useCreateEstimateItem, useDestroyEstimateItem, useUpdateEstimateItem } from '@billing/estimate/hooks/mutations'
import { useReadEstimate, useReadEstimateItems } from '@billing/estimate/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentItemEdit } from '@billing/components/molecules/DocumentItemEdit'
import { DocumentItemManager } from '@billing/components/molecules/DocumentItemManager'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentEstimateHeader } from './DocumentEstimateHeader'

export const EstimateContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    const createEstimateItem = useCreateEstimateItem()
    const updateEstimateItem = useUpdateEstimateItem()
    const destroyEstimateItem = useDestroyEstimateItem()
    const queryEstimateItem = useReadEstimateItems(Number(id))

    const onCreate = (data: BillingItemType) => {
        createEstimateItem.mutate({
            estimate_id: Number(id),
            ...data
        })
    }

    const onUpdateDrag = (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => {
        queryClient.setQueryData(['estimate-items', { estimate_id: Number(id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateEstimateItem.mutate(
            {
                id: Number(draggedId),
                estimate_id: Number(id),
                position: overIndex + 1
            },
            {
                onSuccess: () => {
                    queryEstimateItem.refetch()
                    toast.success("L'élément a été déplacé !")
                }
            }
        )
    }

    const onUpdateFromModal = (data: FieldValues, item: any, handleClose: any) => {
        delete data.position

        updateEstimateItem.mutate(
            {
                estimate_id: Number(id),
                id: Number(item.id),
                ...data
            },
            {
                onSuccess: () => {
                    handleClose()
                }
            }
        )
    }

    const onDestroyFromModal = (item: any, handleClose: any) => {
        destroyEstimateItem.mutate(
            {
                estimate_id: Number(id),
                id: Number(item.id)
            },
            {
                onSuccess: () => {
                    handleClose()
                    toast.success('Ligne mise à jour !')
                }
            }
        )
    }

    return (
        <>
            <DocumentEstimateHeader />
            <DocumentItems editable={true} items={queryEstimateItem.data?.data ?? []} onUpdateDrag={onUpdateDrag}>
                {(item) => <DocumentItemEdit item={item} onUpdateFromModal={onUpdateFromModal} onDestroyFromModal={onDestroyFromModal} />}
            </DocumentItems>
            <DocumentItemManager onCreate={onCreate} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
