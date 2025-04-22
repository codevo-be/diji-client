import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { cva, VariantProps } from 'class-variance-authority'

import { DndContainer } from './Droppable'

type Props = {
    children: React.ReactNode
    items: any[]
    intent?: Variants['intent']
    className?: string
    isLoading?: boolean
    sortable?: boolean
    onDragEnd?: any
}

const style = cva('w-full text-left', {
    variants: {
        intent: {
            white: 'table-white'
        }
    },
    defaultVariants: {
        intent: 'white'
    }
})

type Variants = VariantProps<typeof style>

type PropsItem = {
    name?: string
    children?: React.ReactNode | ((item: any, index?: number) => React.ReactNode)
    item?: Record<string, any>
    index?: number
    className?: string
}

const getNestedValue = (key: string, obj: Record<string, any>): any => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const Item = ({ children, name, item, index, ...props }: PropsItem) => {
    const content = typeof children === 'function' && item ? children(item, index) : name && item ? getNestedValue(name, item) : children

    return (
        <td className="bg-white py-4 px-6 text-xs border-t border-t-grey-400 transition-all group-hover:bg-grey-200 group-hover:cursor-pointer" {...props}>
            {content}
        </td>
    )
}

const Head = ({ children }: { children?: React.ReactNode }) => {
    return <th className="font-semibold py-5 px-6 text-xxs text-grey-800">{children}</th>
}

const ItemSortable = ({ children, item }: any) => {
    const { setNodeRef, transform, transition } = useSortable({ id: item.id })

    return (
        <tr
            ref={setNodeRef}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px) scale(${transform.scaleX}, ${transform.scaleY})` : 'none',
                transition: transition ?? 'none'
            }}>
            {children}
        </tr>
    )
}

const TableSort = ({ children, items, intent, className, sortable, onDragEnd }: Props) => {
    if (!items || items.length === 0) {
        return (
            <>
                <table className={style({ intent, className })}>
                    <thead>
                        <tr>{React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Head)}</tr>
                    </thead>
                </table>
                <p className="py-8 text-xs text-center text-grey-800">Aucun élément dans le tableau !</p>
            </>
        )
    }

    if (sortable) {
        return (
            <DndContainer onDragEnd={onDragEnd}>
                <DndContainer.SortableContainer items={items}>
                    <table className={style({ intent, className })}>
                        <thead>
                            <tr>{React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Head)}</tr>
                        </thead>
                        <tbody>
                            {items.map((item, rowIndex) => {
                                return (
                                    <ItemSortable key={item.id} item={item} rowIndex={rowIndex}>
                                        <td className="bg-white py-6 px-6 text-xs border-t border-t-grey-400 transition-all group-hover:bg-grey-200 flex">
                                            <DndContainer.ButtonSort className="size-4" id={item.id} />
                                        </td>
                                        {React.Children.map(children, (child) => {
                                            if (!React.isValidElement(child) || child.type !== Item) {
                                                return null
                                            }

                                            return React.cloneElement(child as React.ReactElement<{ item: any }>, { item: item })
                                        })}
                                    </ItemSortable>
                                )
                            })}
                        </tbody>
                    </table>
                </DndContainer.SortableContainer>
            </DndContainer>
        )
    }

    return (
        <table className={style({ intent, className })}>
            <thead>
                <tr>{React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Head)}</tr>
            </thead>
            <tbody>
                {items.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {React.Children.map(children, (child) => {
                            if (!React.isValidElement(child) || child.type !== Item) {
                                return null
                            }

                            return React.cloneElement(child as React.ReactElement<{ index: number; item: any }>, { index: rowIndex, item: item })
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

TableSort.Head = Head
TableSort.Item = Item

export { TableSort }
