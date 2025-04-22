import { useParams } from 'next/navigation'

import { FieldValues } from 'react-hook-form'
import { queryClient } from '@digico/utils'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'sonner'

import { useCreateSelfInvoiceItem, useDestroySelfInvoiceItem, useUpdateSelfInvoiceItem } from '@billing/self-invoice/hooks/mutations/item'
import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'
import { useReadSelfInvoiceItems } from '@billing/self-invoice/hooks/queries/item'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentItemEdit } from '@billing/components/molecules/DocumentItemEdit'
import { DocumentItemManager } from '@billing/components/molecules/DocumentItemManager'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentSelfInvoiceHeader } from './DocumentSelfInvoiceHeader'

export const DocumentSelfInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))

    const createSelfInvoiceItem = useCreateSelfInvoiceItem()
    const updateSelfInvoiceItem = useUpdateSelfInvoiceItem()
    const destroySelfInvoiceItem = useDestroySelfInvoiceItem()
    const querySelfInvoiceItem = useReadSelfInvoiceItems(Number(id))

    const onCreate = (data: BillingItemType) => {
        createSelfInvoiceItem.mutate({
            self_invoice_id: Number(id),
            retail: {
                subtotal: data.retail?.subtotal ?? 0
            },
            ...data
        })
    }

    const onUpdateDrag = (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => {
        queryClient.setQueryData(['self-invoice-items', { self_invoice_id: Number(id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateSelfInvoiceItem.mutate(
            {
                id: Number(draggedId),
                self_invoice_id: Number(id),
                position: overIndex + 1
            },
            {
                onSuccess: () => {
                    querySelfInvoiceItem.refetch()
                    toast.success("L'élément a été déplacé !")
                }
            }
        )
    }

    const onUpdateFromModal = (data: FieldValues, item: any, handleClose: any) => {
        delete data.position

        updateSelfInvoiceItem.mutate(
            {
                self_invoice_id: Number(id),
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
        destroySelfInvoiceItem.mutate(
            {
                self_invoice_id: Number(id),
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
            <DocumentSelfInvoiceHeader />
            <DocumentItems editable={true} items={querySelfInvoiceItem.data?.data ?? []} onUpdateDrag={onUpdateDrag}>
                {(item) => <DocumentItemEdit item={item} onUpdateFromModal={onUpdateFromModal} onDestroyFromModal={onDestroyFromModal} />}
            </DocumentItems>
            <DocumentItemManager onCreate={onCreate} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
