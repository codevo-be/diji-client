import { useParams } from 'next/navigation'

import { FieldValues } from 'react-hook-form'
import { queryClient } from '@digico/utils'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'sonner'

import { useCreateCreditNoteItem, useDestroyCreditNoteItem, useUpdateCreditNoteItem } from '@billing/credit-note/hooks/mutations'
import { useReadCreditNote, useReadCreditNoteItems } from '@billing/credit-note/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentItemEdit } from '@billing/components/molecules/DocumentItemEdit'
import { DocumentItemManager } from '@billing/components/molecules/DocumentItemManager'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentCreditNoteHeader } from './DocumentCreditNoteHeader'

export const DocumentCreditNoteContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    const createCreditNoteItem = useCreateCreditNoteItem()
    const updateCreditNoteItem = useUpdateCreditNoteItem()
    const destroyCreditNoteItem = useDestroyCreditNoteItem()
    const queryCreditNoteItem = useReadCreditNoteItems(Number(id))

    const onCreate = (data: BillingItemType) => {
        return createCreditNoteItem.mutateAsync({
            credit_note_id: Number(id),
            retail: {
                subtotal: data.retail?.subtotal ?? 0
            },
            ...data
        })
    }

    const onUpdateDrag = (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => {
        queryClient.setQueryData(['credit-note-items', { credit_note_id: Number(id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateCreditNoteItem.mutate(
            {
                id: Number(draggedId),
                credit_note_id: Number(id),
                position: overIndex + 1
            },
            {
                onSuccess: () => {
                    queryCreditNoteItem.refetch()
                    toast.success("L'élément a été déplacé !")
                }
            }
        )
    }

    const onUpdateFromModal = (data: FieldValues, item: any, handleClose: any) => {
        delete data.position

        updateCreditNoteItem.mutate(
            {
                credit_note_id: Number(id),
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
        destroyCreditNoteItem.mutate(
            {
                credit_note_id: Number(id),
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
            <DocumentCreditNoteHeader />
            <DocumentItems editable={true} items={queryCreditNoteItem.data?.data ?? []} onUpdateDrag={onUpdateDrag}>
                {(item) => <DocumentItemEdit item={item} onUpdateFromModal={onUpdateFromModal} onDestroyFromModal={onDestroyFromModal} />}
            </DocumentItems>
            <DocumentItemManager onCreate={onCreate} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
