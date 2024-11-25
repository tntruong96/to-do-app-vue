import { EStatusTask } from '@/assets/enums/task.enum'
import type { IItemTask } from '@/assets/types/task.type'
import { useLocalStorage } from '@vueuse/core'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'
import { batch, clearCollection, taskRef } from '../utils/firebaseConfig'

// const { value, promise } = useCollection(taskRef)
export const useTaskStore = defineStore('task', {
  state: () => {
    // const dbref = ref()
    // const db = useFirestore()

    return {
      tasks: useCollection<IItemTask>(taskRef),
      selectedTask: [] as { id: number; value: boolean }[],
    }
  },
  actions: {
    async fetchListTask() {},
    async handleAddTask(newTask: IItemTask) {
      try {
        await addDoc(taskRef, newTask)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async handleDelete(id: never) {
      // this.tasks = [...this.tasks.filter((item) => item.id !== id)]
      try {
        const deleteTaskDoc = doc(taskRef, id)
        await deleteDoc(deleteTaskDoc)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async handleCompleteTask(id: never) {
      const updateData = this.tasks
        .map((i) => {
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
        .find((i) => i.id === id)
      console.log(this.tasks)
      try {
        const docRef = doc(taskRef, id)
        await updateDoc(docRef, updateData!)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    async deleteCompletedTasks() {
      this.tasks = this.tasks.filter((i) => i.status === EStatusTask.INCOMPLETE)
      try {
        this.tasks.forEach((i) => {
          const deleteTaskDoc = doc(taskRef, i.id)
          // batch
          // await deleteDoc(deleteTaskDoc)
        })
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },
    handleSelect(data: unknown) {
      const selectData: { id: number; value: boolean } = data as { id: number; value: boolean }
      const filteredData = this.selectedTask.filter((i) => i.id !== selectData.id)
      this.selectedTask = [...filteredData, selectData]
    },
    deleteAllTask() {
      clearCollection('task')
      // this.tasks = []
    },
    resetSelected() {
      this.selectedTask = []
    },
    async completeMultipleTask() {
      const updatedData = this.tasks
        .map((i) => {
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
          return
        })
        .filter((i) => i !== undefined)
      updatedData.forEach((i) => {
        const docRef = doc(taskRef, i.id)
        batch.update(docRef, i)
      })

      await batch.commit()
    },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useTaskStore, import.meta.hot))
// }
