import type { IItemTask } from '@/types/task.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', {
  state: () => {
    return {
      tasks: [] as IItemTask[],
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
  },
  // const tasks = ref<IItemTask[]>([])

  // return { tasks, handleInput }
})
