import { taxes } from 'data/taxes'

import { SelectCustom } from 'components/SelectCustom'

export const SheetInputVat = () => {
    return (
        <SelectCustom
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
