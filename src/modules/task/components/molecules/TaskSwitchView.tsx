import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Icon } from '@components/Icon'
import { useRouteTenant } from 'helpers/route-tenant'

export const TaskSwitchView = () => {
    const { id } = useParams()
    const tenantRouter = useRouteTenant()

    return (
        <div className="flex items-center gap-4 bg-white rounded p-4 border border-grey-400">
            <Link href={tenantRouter.get(`/project/${id}/task`)} className="flex group px-2">
                <Icon name="list" className="fill-grey-800 size-6 transition-all group-hover:fill-main" />
            </Link>
            <Link href={tenantRouter.get(`/project/${id}/kanban`)} className="flex group px-2">
                <Icon name="table" className="fill-grey-800 size-8 transition-all group-hover:fill-main" />
            </Link>
        </div>
    )
}
