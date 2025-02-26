import dynamic from 'next/dynamic'

import { Controller, useFormContext } from 'react-hook-form'
import clsx from 'clsx'

const Select = dynamic(() => import('react-select'), { ssr: false })

type OptionType = {
    label: string
    value: string | number
}

type Props = {
    name: string
    label?: string
    className?: string
    options: OptionType[]
}

export const SelectCustom = ({ className, name, label, ...props }: Props) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <div className="flex flex-col gap-2">
                        {label && <label className="font-medium text-xs">{label}</label>}
                        <Select
                            {...field}
                            {...props}
                            //@ts-ignore
                            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                            value={props.options.find((opt) => opt.value === field.value) || null}
                            className={clsx('', className)}
                        />
                    </div>
                )
            }}
        />
    )
}
