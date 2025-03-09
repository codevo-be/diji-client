import React, { useState } from 'react'

type TabsProps = {
    children: React.ReactNode
    defaultStep: string | number
}

type HeadProps = {
    id: string | number
    children: string
    onClick?: (id: string | number) => void
    isActive?: boolean
}

type ContentProps = {
    children: React.ReactNode
    id: string | number
    activeTab?: string | number
}

const Tabs = ({ children, defaultStep }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<string | number>(defaultStep)

    return (
        <div>
            <div className="flex overflow-x-auto gap-4 mb-8 border-b border-b-grey-400 pb-8">
                {children &&
                    Array.isArray(children) &&
                    children
                        .filter((child) => (child as any).type === Head)
                        .map((tab) =>
                            React.cloneElement(tab as any, {
                                key: (tab as any).props.id,
                                onClick: setActiveTab,
                                isActive: (tab as any).props.id === activeTab
                            })
                        )}
            </div>
            {children &&
                Array.isArray(children) &&
                children
                    .filter((child) => (child as any).type === Content)
                    .map(
                        (content) =>
                            (content as any).props.id === activeTab && React.cloneElement(content as any, { activeTab, key: (content as any).props.id })
                    )}
        </div>
    )
}

const Head = ({ id, children, onClick, isActive }: HeadProps) => {
    return (
        <button
            type="button"
            className={`text-xs transition-all ${isActive ? 'font-medium text-main' : 'text-grey-600 cursor-pointer hover:text-main'}`}
            onClick={() => onClick?.(id)}>
            {children}
        </button>
    )
}

const Content = ({ children, id, activeTab }: ContentProps) => {
    if (id !== activeTab) {
        return null
    }

    return <div>{children}</div>
}

Tabs.Head = Head
Tabs.Content = Content

export { Tabs }
