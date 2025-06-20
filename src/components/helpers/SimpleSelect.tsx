'use client'

import dynamic from 'next/dynamic'

import { useId } from 'react'

const Select = dynamic(() => import('react-select'), { ssr: false })

export type OptionType = {
    label: string
    value: string | number
}

const styleSelect = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: state.isFocused ? '#a5a5a5' : '#e5e5e5',
        borderWidth: '1px',
        borderRadius: '8px',
        fontSize: '14px',
        boxShadow: 'none',
        minHeight: '40px',
        '&:hover': { borderColor: '#a5a5a5' }
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#2f6bff' : 'white',
        color: state.isSelected ? 'white' : '#111928',
        padding: '6px 8px',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': { backgroundColor: '#2f6bff', color: 'white' }
    }),
    placeholder: (provided: any) => ({
        ...provided,
        fontSize: '14px',
        color: '#9ca3af'
    })
}

type Props = {
    name?: string
    required?: boolean
    label?: string
    className?: string
    options: OptionType[]
    defaultValue?: string | number
    onChange?: (option: OptionType | null) => void
    error?: string
    placeholder?: string
    value?: string | number | null
}

export const SimpleSelect = ({
    label,
    name,
    required = false,
    className = '',
    options,
    defaultValue,
    onChange,
    error,
    value,
    placeholder = 'Sélectionner...'
}: Props) => {
    const id = useId()

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <Select
                value={value}
                inputId={id}
                instanceId={id}
                name={name}
                options={options}
                defaultValue={options.filter((option) => option.value === defaultValue)}
                onChange={(option: any) => onChange?.(option)}
                styles={styleSelect}
                placeholder={placeholder}
                isClearable={!required}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}
