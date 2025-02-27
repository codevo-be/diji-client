'use client'

import { useParams } from 'next/navigation'

import { formatCurrency, queryClient } from '@digico/utils'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { toast } from 'sonner'

import { useUpdateInvoiceItem } from '@billing/invoice/hooks/mutations'
import { useReadInvoiceItems } from '@billing/invoice/hooks/queries'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { InvoiceItemEdit } from '../InvoiceItemEdit'
import { TableSort } from '../TableSort'

type Props = {
    className?: string
}

export const InvoiceItemListEditable = ({ className = '' }: Props) => {
    const { id: invoice_id } = useParams()

    const updateInvoiceItem = useUpdateInvoiceItem()

    const queryInvoiceItem = useReadInvoiceItems(Number(invoice_id))

    const onDragEnd = (e: DragEndEvent) => {
        console.log(e.over)

        if (!e.over) {
            return
        }

        const items = queryInvoiceItem.data?.data ?? []
        const draggedId = e.active.id
        const overId = e.over.id

        const draggedIndex = items.findIndex((item: BillingItemType) => item.id === draggedId)
        const overIndex = items.findIndex((item: BillingItemType) => item.id === overId)

        if (draggedIndex === overIndex) {
            return
        }

        const updatedItems = arrayMove(items, draggedIndex, overIndex)

        queryClient.setQueryData(['invoice-items', { invoice_id: Number(invoice_id) }], (oldData: any) => ({
            ...oldData,
            data: updatedItems
        }))

        updateInvoiceItem.mutate(
            {
                id: Number(draggedId),
                invoice_id: Number(invoice_id),
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

    return (
        <TableSort className={className} sortable={true} items={queryInvoiceItem.data?.data ?? []} onDragEnd={onDragEnd}>
            <TableSort.Head>Tri</TableSort.Head>
            <TableSort.Head>Nom</TableSort.Head>
            <TableSort.Head>Qte</TableSort.Head>
            <TableSort.Head>Prix</TableSort.Head>
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
                    return <InvoiceItemEdit item={item} />
                }}
            </TableSort.Item>
        </TableSort>
    )
}
