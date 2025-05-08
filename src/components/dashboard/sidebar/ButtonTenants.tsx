import { useEffect, useRef, useState } from 'react'

import TenantsDropdown from '@components/dashboard/sidebar/TenantsDropdown'

interface ButtonTenantsProps {
    tenant_slug: string;
}

export default function ButtonTenants() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

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
        <li ref={dropdownRef} className={"relative"}>
            <button type={"button"} onClick={() => setIsOpen(!isOpen)}
                  className={"p-5 rounded transition-all hover:bg-white hover:text-main group"}>
                <div className={"bg-white size-7 group-hover:bg-main"}></div>
            </button>

            <div className={`${isOpen ? "absolute": "hidden"} w-[50rem] z-100`} role={"menu"}>
                <TenantsDropdown />
            </div>
        </li>
    );
}