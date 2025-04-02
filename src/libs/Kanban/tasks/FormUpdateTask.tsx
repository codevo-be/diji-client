import { TaskItemType } from '@tasks/types/task.types'

import { Modal } from '@billing/invoice/components/Modal'
import { TaskItemForm } from '@tasks/components/TaskItemForm'

import { useKanbanContext } from '../contexts/KanbanContext'


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
        //@ts-ignore
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
