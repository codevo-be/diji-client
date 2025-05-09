import Link from 'next/link'

export default function TenantsHome() {

    const tenants = [
        {
            id: "era",
            name: "era"
        },
        {
            id: "maskedera",
            name: "maskedera"
        }
    ]

    return (
        <div className={""}>
            <ul className={"flex gap-12"}>
                {tenants.map((tenant) => (
                    <li key={tenant.id}>
                        <Link
                            href={`/${tenant.id}`}
                            className="bg-white size-[12rem] flex items-center justify-center rounded border border-grey-400 group transition-all hover:bg-main">
                            <div className="flex flex-col gap-4 items-center">
                                <h2 className="text-sm text-grey-800 font-medium group-hover:text-white">{tenant.name}</h2>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
}