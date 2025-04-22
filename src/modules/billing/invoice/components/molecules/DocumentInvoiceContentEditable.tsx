import { useParams } from 'next/navigation'

import { FieldValues } from 'react-hook-form'
import { queryClient } from '@digico/utils'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'sonner'

import { useCreateInvoiceItem, useDestroyInvoiceItem, useUpdateInvoiceItem } from '@billing/invoice/hooks/mutations'
import { useReadInvoice, useReadInvoiceItems } from '@billing/invoice/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentItemEdit } from '@billing/components/molecules/DocumentItemEdit'
import { DocumentItemManager } from '@billing/components/molecules/DocumentItemManager'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentInvoiceHeader } from './DocumentInvoiceHeader'

export const DocumentInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))

    const createInvoiceItem = useCreateInvoiceItem()
    const updateInvoiceItem = useUpdateInvoiceItem()
    const destroyInvoiceItem = useDestroyInvoiceItem()
    const queryInvoiceItem = useReadInvoiceItems(Number(id))

    const onCreate = (data: BillingItemType) => {
        createInvoiceItem.mutate({
            invoice_id: Number(id),
            ...data
        })
    }

    const onUpdateDrag = (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => {
        queryClient.setQueryData(['invoice-items', { invoice_id: Number(id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateInvoiceItem.mutate(
            {
                id: Number(draggedId),
                invoice_id: Number(id),
                position: overIndex + 1
            },
            {
                onSuccess: () => {
                    queryInvoiceItem.refetch()
                    toast.success("L'élément a été déplacé !")
                }
            }
        )
    }

    const onUpdateFromModal = (data: FieldValues, item: any, handleClose: any) => {
        delete data.position

        updateInvoiceItem.mutate(
            {
                invoice_id: Number(id),
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
        destroyInvoiceItem.mutate(
            {
                invoice_id: Number(id),
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
            <DocumentInvoiceHeader />
            <DocumentItems editable={true} items={queryInvoiceItem.data?.data ?? []} onUpdateDrag={onUpdateDrag}>
                {(item) => <DocumentItemEdit item={item} onUpdateFromModal={onUpdateFromModal} onDestroyFromModal={onDestroyFromModal} />}
            </DocumentItems>
            <DocumentItemManager onCreate={onCreate} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
