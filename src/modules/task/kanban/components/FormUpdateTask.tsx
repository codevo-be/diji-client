import { useKanbanContext } from '@task/kanban/contexts/KanbanContext'

import { TaskItemType } from '@task/types/task.types' // todo : vérifier pourquoi dans billing

import { Modal } from '@billing/invoice/components/Modal'
import { TaskItemForm } from '@task/list/components/TaskItemForm'

export const FormUpdateTask = () => {
    const { taskOpen, setTaskOpen } = useKanbanContext()
    const parseTaskData = (task: any): TaskItemType => ({
        id: task.id,
        name: task.title,
        description: task.content,
        status: task.status,
        priority: task.priority,
        task_column_id: task.category_id
    })

    const formattedTask = taskOpen ? parseTaskData(taskOpen) : null
    console.log("On ouvre la modale")
    return (
        <Modal open={!!taskOpen} setOpen={(isOpen) => setTaskOpen(isOpen ? taskOpen : null)}>
            <Modal.Content>
                {({ handleClose }) => (
                    <TaskItemForm
                        task={formattedTask}
                        columnId={formattedTask?.task_column_id || 1}
                        onDeleteSuccess={() => {
                            setTaskOpen(null);
                            handleClose();
                        }}
                        onUpdateSuccess={() => {
                            setTaskOpen(null);
                            handleClose();
                        }}
                    />
                )}
            </Modal.Content>
        </Modal>
    )
}
