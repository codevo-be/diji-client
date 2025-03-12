'use client'

import { useParams } from 'next/navigation'

import { formatCurrency, queryClient } from '@digico/utils'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { toast } from 'sonner'

import { useUpdateSelfInvoiceItem } from '@billing/self-invoice/hooks/mutations/item'
import { useReadSelfInvoiceItems } from '@billing/self-invoice/hooks/queries/item'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { SelfInvoiceItemEdit } from '../SelfInvoiceItemEdit'
import { TableSort } from '../TableSort'

type Props = {
    className?: string
}

export const SelfInvoiceItemListEditable = ({ className = '' }: Props) => {
    const { id: self_invoice_id } = useParams()

    const updateSelfInvoiceItem = useUpdateSelfInvoiceItem()

    const querySelfInvoiceItem = useReadSelfInvoiceItems(Number(self_invoice_id))

    const onDragEnd = (e: DragEndEvent) => {
        if (!e.over) {
            return
        }

        const items = querySelfInvoiceItem.data?.data ?? []
        const draggedId = e.active.id
        const overId = e.over.id

        const draggedIndex = items.findIndex((item: BillingItemType) => item.id === draggedId)
        const overIndex = items.findIndex((item: BillingItemType) => item.id === overId)

        if (draggedIndex === overIndex) {
            return
        }

        const updatedItems = arrayMove(items, draggedIndex, overIndex)

        queryClient.setQueryData(['self-invoice-items', { self_invoice_id: Number(self_invoice_id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateSelfInvoiceItem.mutate(
            {
                id: Number(draggedId),
                self_invoice_id: Number(self_invoice_id),
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

    return (
        <TableSort className={className} sortable={true} items={querySelfInvoiceItem.data?.data ?? []} onDragEnd={onDragEnd}>
            <TableSort.Head>Tri</TableSort.Head>
            <TableSort.Head>Nom</TableSort.Head>
            <TableSort.Head>Qte</TableSort.Head>
            <TableSort.Head>Prix U. HT</TableSort.Head>
            <TableSort.Head>TVA</TableSort.Head>
            <TableSort.Head>Total HT</TableSort.Head>
            <TableSort.Head></TableSort.Head>
            <TableSort.Item
                className="w-full bg-white py-4 px-6 text-xs border-t border-t-grey-400 transition-all group-hover:bg-grey-200 group-hover:cursor-pointer"
                name="name"
            />
            <TableSort.Item name="quantity" />
            <TableSort.Item>
                {(item) => {
                    if (!item.retail) {
                        return ''
                    }
                    return formatCurrency(item.retail.subtotal ?? 0)
                }}
            </TableSort.Item>
            <TableSort.Item>
                {(item: BillingItemType) => {
                    return `${item.vat}%`
                }}
            </TableSort.Item>
            <TableSort.Item>
                {(item: any) => {
                    if (!item.quantity) {
                        return ''
                    }

                    return formatCurrency(item.quantity * (item.retail?.subtotal ?? 0))
                }}
            </TableSort.Item>
            <TableSort.Item>
                {(item) => {
                    return <SelfInvoiceItemEdit item={item} />
                }}
            </TableSort.Item>
        </TableSort>
    )
}
