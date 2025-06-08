import { ImageBuilder } from '@digico/ui'

type Props = {
    children: React.ReactNode
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <div className="h-screen flex">
            <div className="w-full max-mobile:hidden relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary/80">
                <ImageBuilder className="w-full h-full object-cover object-center" src="/images/auth-background.jpg" />
            </div>

            <div className="w-[62rem] max-tablet:w-full flex-shrink-0">{children}</div>
        </div>
    )
}
