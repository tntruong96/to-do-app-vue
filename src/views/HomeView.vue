<script setup lang="ts">
import FormComponent from '@/components/Form/FormComponent.vue'
import ItemTask from '@/components/ItemTask/ItemTask.vue'
import Button from '@/elements/Button.vue'
import { useTaskStore } from '@/stores/task'
import { type IItemTask } from '@/types/task.type.ts'
import { ref } from 'vue'

// const tasksData = ref<IItemTask[]>([])
const stores = useTaskStore()
const selectedData = ref<{ id: number; value: boolean }[]>([])
const reset = ref(false)
const refChild = ref()

function handleCompleteTask(id: number) {
  // tasksData.value = tasksData.value.map((i) => {
  //   if (id === i.id) {
  //     let taskStatus
  //     if (i.status === EStatusTask.COMPLETED) {
  //       taskStatus = EStatusTask.INCOMPLETE
  //     } else if (i.status === EStatusTask.INCOMPLETE) {
  //       taskStatus = EStatusTask.COMPLETED
  //     } else {
  //       taskStatus = i.status
  //     }
  //     return { ...i, status: taskStatus }
  //   }
  //   return i
  // })
}

function handleSelect(data: { id: number; value: boolean }) {
  // const filteredData = selectedData.value.filter((i) => i.id !== data.id)
  // selectedData.value = [...filteredData, data]
}

function deleteAllTask() {
  // tasksData.value = []
}

function deleteCompletedTasks() {
  // tasksData.value = tasksData.value.filter((i) => i.status === EStatusTask.INCOMPLETE)
}

function resetSelected() {
  selectedData.value = []
}

function completeMultipleTask() {
  // tasksData.value = []
  // const mappedData = tasksData.value.map((i) => {
  //   const chosenData = selectedData.value.find((s) => s.id === i.id)
  //   if (chosenData && chosenData.value === true) {
  //     return { ...i, status: EStatusTask.COMPLETED }
  //   }
  //   return i
  // })
  // tasksData.value = mappedData
}
</script>

<template>
  <!-- <main> -->
  <div class="container">
    <FormComponent />
    <!-- <ListTask :tasksData="tasksData" /> -->
    <TransitionGroup tag="div" name="fade" class="list-wrapper">
      <ItemTask
        v-for="task in stores.tasks"
        :taskData="task"
        :key="task.id"
        @onComplete="handleCompleteTask"
        @onSelect="handleSelect"
        :shouldReset="reset"
        ref="childRef"
      />
    </TransitionGroup>
    <div class="group-button">
      <Button @onClick="completeMultipleTask">Complete Multiple Task</Button>
      <Button @onClick="deleteAllTask">Delete All Task</Button>
      <Button @onClick="deleteCompletedTasks">Delete Completed Task</Button>
    </div>
  </div>
  <!-- </main> -->
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  min-width: 400px;
  max-width: 900px;
  height: 100%;
  background: white;
  padding-block: 2rem;
  padding-inline: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height 100ms ease-in;
  h1 {
    font-weight: 700;
  }
}

.list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 4px;
  position: relative;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(20px, 0px);
}

.group-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
}
</style>
