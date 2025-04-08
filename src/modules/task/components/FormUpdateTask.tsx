import { TaskItemType } from "@/modules/task/types/task.types"

import { TaskItemForm } from "@/modules/task/components/TaskItemForm"

import { Modal } from '../../Modal'

import { useKanbanContext } from "@/libs/Kanban/contexts/KanbanContext"

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
