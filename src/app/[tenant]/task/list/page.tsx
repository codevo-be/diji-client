'use client'

import { useState } from 'react'
import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { TaskItemType } from '@tasks/types/task.types'

import { TaskColumnList } from '@tasks/components/TaskColumnList'
import { TaskItemForm } from '@tasks/components/TaskItemForm'

export default function Index() {
    const [selectedTask, setSelectedTask] = useState<TaskItemType | null>(null)
    const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null)

    const handleAddTask = (columnId: number) => {
        setSelectedTask(null)
        setSelectedColumnId(columnId)
    }

    const handleDeleteSuccess = () => {
        setSelectedTask(null)
    }

    return (
        <div className="flex flex-col gap-6 h-screen">
            {/* Ajout d'un div pour encapsuler le Menu et éviter les conflits avec overflow-x-auto */}
            <div className="w-full overflow-visible">
                <Menu
                    //@ts-ignore
                    links={[
                        {
                            href: getTenantUrl('/task/list'),
                            label: 'Tâches',
                            active: true
                        },
                        {
                            href: getTenantUrl('/task/kanban'),
                            label: 'Kanban'
                        }
                    ]}
                />
            </div>

            <div className="flex gap-6 flex-1">
                {/* Colonne gauche : Liste des colonnes & tâches */}
                <div className="flex-1 overflow-y-auto">
                    <div className="flex gap-4 justify-between items-center mb-4">
                    </div>
                    <TaskColumnList onSelectTask={setSelectedTask} onAddTask={handleAddTask} />
                </div>

                {/* Colonne droite : Formulaire de tâche */}
                <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow h-screen overflow-y-auto sticky top-0">
                    <h2 className="text-lg font-bold mb-4">
                        {selectedTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
                    </h2>
                    <TaskItemForm task={selectedTask} columnId={selectedColumnId} onDeleteSuccess={handleDeleteSuccess} />
                </div>
            </div>
        </div>
    )
}
