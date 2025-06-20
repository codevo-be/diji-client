import { Icon } from '@components/Icon'
import { Modal } from '@helpers/Modal'

export const AddCard = () => {
    return (
        <Modal>
            <Modal.Trigger>
                <button className="w-full rounded border border-dashed border-grey-400 p-6 flex justify-center items-center text-grey-800 transition-all hover:text-primary hover:border-primary hover:bg-white">
                    <Icon name="cross" className="rotate-45 size-4 fill-current" />
                </button>
            </Modal.Trigger>
            <Modal.Content>{() => <div>aa</div>}</Modal.Content>
        </Modal>
    )
}
