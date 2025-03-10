import { Form } from '@digico/ui'

export const SheetInputPricing = () => {
    const name = 'retail.subtotal'

    return <Form.Field suffix="€/ht" placeholder="0" type="number" className="w-[14rem]" name={name} />
}
