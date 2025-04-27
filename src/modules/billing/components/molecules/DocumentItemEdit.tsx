import { FieldValues, useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { taxes } from 'data/taxes'

import { BillingItemType } from '@billing/billing-item/types/BillingItem'

import { Icon } from 'components/Icon'
import { Modal } from '@helpers/Modal'

type Props = {
    item: BillingItemType & {
        cost: any
        retail: any
    }
    onDestroyFromModal: (item: Props['item'], handleClose: any) => void
    onUpdateFromModal: (data: FieldValues, item: Props['item'], handleClose: any) => void
}

export const DocumentItemEdit = ({ item, onDestroyFromModal, onUpdateFromModal }: Props) => {
    const form = useForm({
        defaultValues: item
    })

    return (
        <Modal>
            <Modal.Trigger>
                <button type="button" className="text-grey-400 cursor-pointer">
                    <Icon name="edit" className="size-6 fill-current transition-all hover:fill-main" />
                </button>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }: any) => {
                    return (
                        <Form useForm={form} onSubmit={(data) => onUpdateFromModal(data, item, handleClose)}>
                            <Form.Field label="Titre" name="name" placeholder="Nom" id="name" />
                            <Form.Field label="Quantité" name="quantity" placeholder="1" id="quantity" />
                            <Form.Select
                                name="vat"
                                label="Taux tva"
                                options={taxes.map((tax) => {
                                    return {
                                        label: String(tax),
                                        value: tax
                                    }
                                })}
                            />
                            <Form.Field type="number" label="Prix de vente" name="retail.subtotal" placeholder="1" id="retail.subtotal" />

                            <div className="flex flex-col gap-2">
                                <Button type="submit">Sauvegarder</Button>
                                <Button onClick={() => onDestroyFromModal(item, handleClose)} intent={'error'} type="button">
                                    Supprimer
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Modal.Content>
        </Modal>
    )
}
