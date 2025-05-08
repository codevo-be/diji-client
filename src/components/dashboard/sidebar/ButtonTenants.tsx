'use client'

import { useEffect, useRef, useState } from 'react'

import TenantsDropdown from '@components/dashboard/sidebar/TenantsDropdown'
import { useAuth } from '../../../helpers/auth-context/useAuth'

export default function ButtonTenants() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLLIElement>(null);
    const { tenants, tenant } = useAuth()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return (
        <li ref={dropdownRef} className={"relative h-[4.2rem] bg-white rounded"}>
            <button type={"button"} onClick={() => setIsOpen(!isOpen)}
                  className={"hover:cursor-pointer size-full"}>

            </button>

            <div className={`${isOpen ? "absolute": "hidden"} w-[50rem] z-100`} role={"menu"}>
                <TenantsDropdown tenants={tenants} currentTenant={tenant} />
            </div>
        </li>
    );
}