'use client'

import { useAuth } from "@/contexts/AuthContext"
import { TaskKanban } from "@/libs/Kanban/tasks/TaskKanban"
import { Menu } from "@/libs/Menu"
import { routes } from "@/utils/route"

export default function Index() {
    const { workspace } = useAuth()

    return (
        <div className="flex flex-col gap-6 h-screen">
            <div className="w-full overflow-visible">
                <Menu
                    links={[
                        {
                            href: routes.workspace.taskColumns.list(workspace.slug),
                            label: 'Tâches'
                        },
                        {
                            href: routes.workspace.taskColumns.kanban(workspace.slug),
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
