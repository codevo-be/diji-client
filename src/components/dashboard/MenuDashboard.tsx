import { ButtonLogout } from 'components/auth/ButtonLogout'

import { MenuItemDashboard } from './MenuItemDashboard'

export const MenuDashboard = () => {
    return (
        <div className="w-auto bg-main py-8 px-2">
            <ul className="h-full flex flex-col items-center">
                <li>
                    <MenuItemDashboard name="app" href="/" />
                </li>

                <li className="mt-auto">
                    <ButtonLogout />
                </li>
            </ul>
        </div>
    )
}
