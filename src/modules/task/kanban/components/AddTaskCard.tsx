import { KanbanCategoryType } from '@task/types/kanban-category.types'

import { Modal } from '@billing/invoice/components/Modal'
import { Icon } from '@components/Icon'
import { TaskItemForm } from '@task/list/components/TaskItemForm'

type Props = {
    column: KanbanCategoryType | undefined
}

export const AddCard = ({ column }: Props) => {
    return (
        <Modal>
            <Modal.Trigger>
                <button
                    className="w-full rounded border border-dashed border-grey-400 p-6 flex justify-center items-center text-grey-800 transition-all hover:text-primary hover:border-primary hover:bg-white">
                    <Icon name="cross" className="rotate-45 size-4 fill-current" />
                </button>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }) => (
                    <TaskItemForm
                        task={null}
                        columnId={column?.id || null}
                        onDeleteSuccess={handleClose}
                        onUpdateSuccess={handleClose}
                    />
                )}
            </Modal.Content>
        </Modal>
    )
}