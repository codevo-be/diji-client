'use client'

import { Control,Controller } from 'react-hook-form'
import Select from 'react-select'

type Option = {
    label: string
    value: number
}

type Props = {
    name: string
    control: Control<any>
    label?: string
    options: Option[]
}

export const SelectMultiUser = ({ name, control, label, options }: Props) => {
    return (
        <div className="mb-4">
            {label && <label className="block mb-2 font-medium text-sm">{label}</label>}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        isMulti
                        options={options}
                        value={options.filter((opt) => field.value?.includes(opt.value))}
                        onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                )}
            />
        </div>
    )
}
