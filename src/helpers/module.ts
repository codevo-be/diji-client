export const getModules = (): Array<{
    name: string
    href: string
}> => {
    return process.env.NEXT_PUBLIC_MODULES ? JSON.parse(process.env.NEXT_PUBLIC_MODULES) : []
}
