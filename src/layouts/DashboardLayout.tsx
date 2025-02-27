import { MenuSidebar } from '@components/dashboard/sidebar/MenuSidebar'

type Props = {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="flex h-screen bg-grey-200">
            <MenuSidebar />
            <div className="flex-1 overflow-y-auto p-12">{children}</div>
        </div>
    )
}
