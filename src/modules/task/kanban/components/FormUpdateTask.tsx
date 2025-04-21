import { useKanbanContext } from '@task/kanban/contexts/KanbanContext'

import { Modal } from '@billing/invoice/components/Modal'

export const FormUpdateTask = () => {
    const { taskOpen, setTaskOpen } = useKanbanContext()

    return (
        <Modal open={!!taskOpen} setOpen={(isOpen) => setTaskOpen(isOpen ? taskOpen : null)}>
            <Modal.Content>{() => <div>a</div>}</Modal.Content>
        </Modal>
    )
}
