import Link from 'next/link'

import { useState } from 'react'

import { useAuth } from 'helpers/auth-context/useAuth'

export const TenantSwitcher = () => {
    const { tenants, tenant } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const firstLetter = tenant?.name?.charAt(0)

    if (tenants.length <= 1) {
        return null
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer font-bold flex p-5 leading-none rounded transition-all hover:bg-white hover:text-main ${isOpen ? 'bg-white text-main' : 'text-white'}`}>
                {firstLetter}
            </button>

            {isOpen && (
                <ul className="mt-2 flex flex-col gap-2">
                    {tenants
                        .filter((t) => t.id !== tenant?.id)
                        .map((tenant) => (
                            <li key={tenant.id}>
                                <Link
                                    href={`/${tenant.id}`}
                                    className="cursor-pointer text-white leading-none w-full flex items-center justify-center font-bold p-5 rounded transition-all hover:bg-white hover:text-main">
                                    {tenant.name.charAt(0)}
                                </Link>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}
