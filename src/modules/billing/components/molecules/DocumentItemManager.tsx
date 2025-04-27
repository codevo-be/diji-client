import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { taxes } from 'data/taxes'

import { BillingItemType } from '@billing/billing-item/types/BillingItem'

type Props = {
    onCreate: (data: BillingItemType) => Promise<{ data: BillingItemType }>
}

export const DocumentItemManager = ({ onCreate }: Props) => {
    const form = useForm<BillingItemType>({
        defaultValues: {
            vat: 21,
            type: 'product'
        }
    })

    const onSubmit = (data: BillingItemType) => {
        if (onCreate) {
            onCreate(data).then(() => {
                form.reset()
                form.setValue('quantity', 1)
            })
        }
    }

    return (
        <Box className="!p-4 mt-20 !bg-grey-200">
            <Form useForm={form} onSubmit={onSubmit} className="!gap-4">
                <Form.Field type="textarea" rows={4} className="w-full" name="name" placeholder="Texte libre" />
                <div className="flex gap-2">
                    <Form.Select
                        className="!w-[12rem] flex-shrink-0"
                        name="type"
                        options={[
                            {
                                label: 'Titre',
                                value: 'title'
                            },
                            {
                                label: 'Texte',
                                value: 'text'
                            },
                            {
                                label: 'Produit',
                                value: 'product'
                            }
                        ]}
                    />
                    <Form.Field suffix="pce" type="number" className=" !w-[8rem] flex-shrink-0" name={'quantity'} defaultValue={1} />
                    <Form.Select
                        name="vat"
                        className="!h-full !w-[10rem] flex-shrink-0"
                        options={taxes.map((tax) => {
                            return {
                                label: String(tax),
                                value: tax
                            }
                        })}
                    />
                    <Form.Field suffix="€/ht" placeholder="0" type="number" className="w-[14rem]" name={'retail.subtotal'} />
                    <Button type="submit" className="flex-1">
                        Ajouter
                    </Button>
                </div>
            </Form>
        </Box>
    )
}
