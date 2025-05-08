import TenantsDropdownItem from '@components/dashboard/sidebar/TenantsDropdownItem'

interface TenantsDropdownProps {

}

export default function TenantsDropdown(props: TenantsDropdownProps) {
    return (
        <ul className={"w-full p-4 bg-grey-400 text-main flex flex-col gap-2 rounded"}>

            <TenantsDropdownItem />
            <TenantsDropdownItem />
            <TenantsDropdownItem />

            <li>
                Ajouter ou rejoindre un tenant.
            </li>
        </ul>
    )
}