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
    onChange?: (value: string | number) => void
}

export const SelectCustom = ({ className, name, label, onChange, ...props }: Props) => {
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
                            onChange={(selectedOption: any) => {
                                field.onChange(selectedOption?.value)
                                if (onChange) {
                                    onChange(selectedOption?.value)
                                }
                            }}
                            value={props.options.find((opt) => opt.value === field.value) || null}
                            className={clsx('', className)}
                            styles={{
                                control: (provided, state) => {
                                    return {
                                        ...provided,
                                        backgroundColor: state.isFocused ? '#f7f7f7' : 'transparent',
                                        borderColor: state.isFocused ? '#a5a5a5' : '#e5e5e5',
                                        borderWidth: '1px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            borderColor: '#a5a5a5'
                                        }
                                    }
                                },
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected ? '#2f6bff' : 'white',
                                    color: state.isSelected ? 'white' : '#111928',
                                    padding: '6px 8px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#EAF0FF'
                                    }
                                })
                            }}
                        />
                    </div>
                )
            }}
        />
    )
}
