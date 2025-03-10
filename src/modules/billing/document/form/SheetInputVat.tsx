import { Form } from '@digico/ui'
import { taxes } from 'data/taxes'

export const SheetInputVat = () => {
    return (
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
    )
}
