<script setup lang="ts">
import FormComponent from '@/assets/components/Form/FormComponent.vue'
import ItemTask from '@/assets/components/ItemTask/ItemTask.vue'
import Button from '@/assets/elements/Button.vue'
import { useTaskStore } from '@/assets/stores/task'
import { type IItemTask } from '@/assets/types/task.type'
import { collection, getFirestore } from 'firebase/firestore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'

// const tasksData = ref<IItemTask[]>([])
const store = useTaskStore()
const { tasks } = storeToRefs(store)
const { fetchListTask } = useTaskStore()
// const store = getFirestore()
// const taskData = useCollection(collection(store, 'taskCollection'))
// console.log(taskData)
function handleMultipleComplete() {
  store.completeMultipleTask()
  store.resetSelected()
}

onMounted(() => {
  console.log(tasks.value)
})
</script>

<template>
  <div class="container">
    <h1>TO DO APP</h1>
    <FormComponent />
    <TransitionGroup tag="div" name="fade" class="list-wrapper">
      <ItemTask v-for="task in tasks" :taskData="task" :key="task.id" />
    </TransitionGroup>
    <div class="group-button">
      <Button @onClick="handleMultipleComplete">Complete Multiple Task</Button>
      <Button @onClick="store.deleteAllTask">Delete All Task</Button>
      <Button @onClick="store.deleteCompletedTasks">Delete Completed Task</Button>
    </div>
  </div>
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
