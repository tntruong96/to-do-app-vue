import type { EStatusTask } from '@/assets/enums/task.enum'

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
  id: never
  title: string
  status: EStatusTask
  // isSelected: boolean
}

export { type IPropListTask, type IItemTask, type IPropsInput, type IPropsItemTask }
