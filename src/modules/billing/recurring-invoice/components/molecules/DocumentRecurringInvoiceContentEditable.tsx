import { useParams } from 'next/navigation'

import { FieldValues } from 'react-hook-form'
import { queryClient } from '@digico/utils'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'sonner'

import { useCreateRecurringInvoiceItem, useDestroyRecurringInvoiceItem, useUpdateRecurringInvoiceItem } from '@billing/recurring-invoice/hooks/mutations'
import { useReadRecurringInvoice, useReadRecurringInvoiceItems } from '@billing/recurring-invoice/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentItemEdit } from '@billing/components/molecules/DocumentItemEdit'
import { DocumentItemManager } from '@billing/components/molecules/DocumentItemManager'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentRecurringInvoiceHeader } from './DocumentRecurringInvoiceHeader'

export const DocumentRecurringInvoiceContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))

    const createRecurringInvoiceItem = useCreateRecurringInvoiceItem()
    const updateRecurringInvoiceItem = useUpdateRecurringInvoiceItem()
    const destroyRecurringInvoiceItem = useDestroyRecurringInvoiceItem()
    const queryRecurringInvoiceItem = useReadRecurringInvoiceItems(Number(id))

    const onCreate = (data: BillingItemType) => {
        createRecurringInvoiceItem.mutate({
            recurring_invoice_id: Number(id),
            ...data
        })
    }

    const onUpdateDrag = (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => {
        queryClient.setQueryData(['recurring-invoice-items', { credit_note_id: Number(id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateRecurringInvoiceItem.mutate(
            {
                id: Number(draggedId),
                recurring_invoice_id: Number(id),
                position: overIndex + 1
            },
            {
                onSuccess: () => {
                    queryRecurringInvoiceItem.refetch()
                    toast.success("L'élément a été déplacé !")
                }
            }
        )
    }

    const onUpdateFromModal = (data: FieldValues, item: any, handleClose: any) => {
        delete data.position

        updateRecurringInvoiceItem.mutate(
            {
                recurring_invoice_id: Number(id),
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
        destroyRecurringInvoiceItem.mutate(
            {
                recurring_invoice_id: Number(id),
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
            <DocumentRecurringInvoiceHeader />
            <DocumentItems editable={true} items={queryRecurringInvoiceItem.data?.data ?? []} onUpdateDrag={onUpdateDrag}>
                {(item) => <DocumentItemEdit item={item} onUpdateFromModal={onUpdateFromModal} onDestroyFromModal={onDestroyFromModal} />}
            </DocumentItems>
            <DocumentItemManager onCreate={onCreate} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
