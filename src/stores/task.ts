import { EStatusTask } from '@/enums/task.enum'
import type { IItemTask } from '@/types/task.type'
import { useLocalStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: useLocalStorage('pinia/tasks', [] as IItemTask[]),
      selectedTask: [] as { id: number; value: boolean }[],
    }
  },
  actions: {
    handleAddTask(newTask: IItemTask) {
      // const updatedTasks: IItemTask[] = [...this.tasks, newTask]
      this.tasks = [...this.tasks, newTask]
    },
    handleDelete(id: number) {
      this.tasks = [...this.tasks.filter((item) => item.id !== id)]
    },
    handleCompleteTask(id: number) {
      this.tasks = this.tasks.map((i) => {
        if (id === i.id) {
          let taskStatus
          if (i.status === EStatusTask.COMPLETED) {
            taskStatus = EStatusTask.INCOMPLETE
          } else if (i.status === EStatusTask.INCOMPLETE) {
            taskStatus = EStatusTask.COMPLETED
          }
          return taskStatus ? { ...i, status: taskStatus } : { ...i }
        }
        return i
      })
    },
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter((i) => i.status === EStatusTask.INCOMPLETE)
    },
    handleSelect(data: unknown) {
      const selectData: { id: number; value: boolean } = data as { id: number; value: boolean }
      const filteredData = this.selectedTask.filter((i) => i.id !== selectData.id)
      this.selectedTask = [...filteredData, selectData]
    },
    deleteAllTask() {
      this.tasks = []
    },
    resetSelected() {
      this.selectedTask = []
    },
    completeMultipleTask() {
      const mappedData = this.tasks.map((i) => {
        const chosenData = this.selectedTask.find((s) => s.id === i.id)
        if (chosenData && chosenData.value === true) {
          let status
          if (i.status === EStatusTask.INCOMPLETE) {
            status = EStatusTask.COMPLETED
          } else {
            status = EStatusTask.INCOMPLETE
          }
          return { ...i, status }
        }
        return i
      })
      this.tasks = mappedData
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
}
