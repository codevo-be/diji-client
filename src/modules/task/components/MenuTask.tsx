import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuTask = () => {
    return (
        <Menu>
            <Menu.Item href={getTenantUrl('/task/kanban')}>Kanban</Menu.Item>
            <Menu.Item href={getTenantUrl('/task/list')}>Liste</Menu.Item>
        </Menu>
    )
}
