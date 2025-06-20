'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

import { TaskItemType } from '@task/types/task-item'

type Task = {
    task: TaskItemType | null
    setTask: Dispatch<SetStateAction<TaskItemType | null>>
}

export const TaskContext = createContext<Task>({
    task: null,
    setTask: () => {}
})

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [task, setTask] = useState<TaskItemType | null>(null)
    return <TaskContext.Provider value={{ task, setTask }}>{children}</TaskContext.Provider>
}
