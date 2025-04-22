'use client'

import { formatCurrency } from '@digico/utils'
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { TableSort } from '@helpers/TableSort'

type Props = {
    children?: (
        item: BillingItemType & {
            cost: any
            retail: any
        }
    ) => React.ReactNode
    editable?: boolean
    onUpdateDrag?: (draggedId: UniqueIdentifier, overIndex: number, updatedItems: BillingItemType[]) => void
    items: BillingItemType[]
}

export const DocumentItems = ({ items, onUpdateDrag, editable = false, children }: Props) => {
    const onDragEnd = (e: DragEndEvent) => {
        if (!e.over) {
            return
        }

        const draggedId = e.active.id
        const overId = e.over.id

        const draggedIndex = items.findIndex((item: BillingItemType) => item.id === draggedId)
        const overIndex = items.findIndex((item: BillingItemType) => item.id === overId)

        if (draggedIndex === overIndex) {
            return
        }

        const updatedItems = arrayMove(items, draggedIndex, overIndex)

        if (onUpdateDrag) {
            onUpdateDrag(draggedId, overIndex, updatedItems)
        }
    }

    return (
        <TableSort sortable={editable} items={items} onDragEnd={onDragEnd}>
            {editable ? <TableSort.Head>Tri</TableSort.Head> : null}
            <TableSort.Head>Nom</TableSort.Head>
            <TableSort.Head>Qte</TableSort.Head>
            <TableSort.Head>Prix U. HT</TableSort.Head>
            <TableSort.Head>TVA</TableSort.Head>
            <TableSort.Head>Total HT</TableSort.Head>
            {editable ? <TableSort.Head></TableSort.Head> : null}
            <TableSort.Item className="w-full bg-white py-4 px-6 text-xs border-t border-t-grey-400 transition-all group-hover:bg-grey-200" name="name" />
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
            {editable ? (
                <TableSort.Item>
                    {(item) => {
                        return children?.(item)
                    }}
                </TableSort.Item>
            ) : null}
        </TableSort>
    )
}
