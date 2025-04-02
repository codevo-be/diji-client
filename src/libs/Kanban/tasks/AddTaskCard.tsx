import { Modal } from '../../Modal'

import { Icon } from '@/components/Icon'
import {KanbanCategoryType} from "@/modules/kanban/types/kanban-category.types";
import {TaskItemForm} from "@/modules/task/components/TaskItemForm";

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
                        task={null} // Mode création
                        columnId={column?.id || null}
                        onDeleteSuccess={handleClose}
                        onUpdateSuccess={handleClose}
                    />
                )}
            </Modal.Content>
        </Modal>
    )
}