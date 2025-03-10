import { Form } from '@digico/ui'

export const SheetInputQuantity = () => {
    const name = 'quantity'

    return <Form.Field suffix="pce" type="number" className=" !w-[8rem] flex-shrink-0" name={name} defaultValue={1} />
}
