import { Form } from '@digico/ui'

export const SheetInputPricing = () => {
    const name = 'retail.subtotal'

    return <Form.Field placeholder="0" type="number" className="flex-shrink-0 w-[14rem]" name={name} />
}
