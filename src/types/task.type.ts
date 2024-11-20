import type { EStatusTask } from '@/enums/task.enum'

interface IPropListTask {
  tasksData?: IItemTask[]
}

interface IPropsInput {
  addMethod: (task: IItemTask) => void
}

interface IPropsItemTask {
  taskData: IItemTask
}

interface IItemTask {
  id: number
  title: string
  status: EStatusTask
}

export { type IPropListTask, type IItemTask, type IPropsInput, type IPropsItemTask }
