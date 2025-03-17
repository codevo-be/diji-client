import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { SheetInputName } from '@billing/document/form/SheetInputName'
import { SheetInputPricing } from '@billing/document/form/SheetInputPricing'
import { SheetInputQuantity } from '@billing/document/form/SheetInputQuantity'
import { SheetInputVat } from '@billing/document/form/SheetInputVat'
import { Button, Form } from '@digico/ui'
import { queryClient } from '@digico/utils'

import { useCreateSelfInvoiceItem } from '@billing/self-invoice/hooks/mutations/item'
import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export const ItemManager = () => {
    const { id: self_invoice_id } = useParams()
    const form = useForm<BillingItemType>({
        defaultValues: {
            vat: 21,
            name: ''
        }
    })

    const { mutate, isPending } = useCreateSelfInvoiceItem()

    const handleItemAdded = ({ retail, ...data }: BillingItemType) => {
        const tax = ((data.vat ?? 0) / 100) * (retail?.subtotal ?? 0)

        mutate(
            {
                self_invoice_id: Number(self_invoice_id),
                retail: {
                    subtotal: retail?.subtotal ?? 0,
                    tax: tax,
                    total: (retail?.subtotal ?? 0) + tax
                },
                ...data
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ['self-invoices', { id: Number(self_invoice_id) }]
                    })

                    form.reset()
                }
            }
        )
    }

    return (
        <Form useForm={form} onSubmit={handleItemAdded} className="mt-12 !gap-4">
            <div className="flex gap-2">
                <SheetInputQuantity />
                <SheetInputVat />
                <SheetInputPricing />
                <Button isLoading={isPending} type="submit" className="flex-1">
                    Ajouter
                </Button>
            </div>

            <SheetInputName />
        </Form>
    )
}
