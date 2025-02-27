import { Form } from '@digico/ui'

export const SheetInputQuantity = () => {
    const name = 'quantity'

    return <Form.Field type="number" className="!w-[12rem] flex-shrink-0" name={name} defaultValue={1} />
}
