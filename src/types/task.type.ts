interface IPropListTask {
  tasksData?: IItemTask[]
}

interface IPropsInput {
  addMethod: () => void
}

interface IPropsItemTask {
  taskData: IItemTask
}

interface IItemTask {
  id: number
  title: string
  status: string
}

export { type IPropListTask, type IItemTask, type IPropsInput, type IPropsItemTask }
