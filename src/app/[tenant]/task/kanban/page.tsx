'use client'

import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { TaskKanban } from '../../../../libs/Kanban/tasks/TaskKanban'

export default function Index() {
    return (
        <div className="flex flex-col gap-6 h-screen">
            <div className="w-full overflow-visible">
                <Menu
                    //@ts-ignore
                    links={[
                        {
                            href: getTenantUrl('/task/list'),
                            label: 'Tâches'
                        },
                        {
                            href: getTenantUrl('/task/kanban'),
                            label: 'Kanban',
                            active: true
                        }
                    ]}
                />
            </div>

            <div className="flex-grow h-full">
                <TaskKanban />
            </div>
        </div>
    )
}
