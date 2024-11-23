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
function handleMultipleComplete() {
  stores.completeMultipleTask()
  stores.resetSelected()
}
</script>

<template>
  <div class="container">
    <h1>TO DO APP</h1>
    <FormComponent />
    <TransitionGroup tag="div" name="fade" class="list-wrapper">
      <ItemTask v-for="task in stores.tasks" :taskData="task" :key="task.id" :shouldReset="reset" />
    </TransitionGroup>
    <div class="group-button">
      <Button @onClick="handleMultipleComplete">Complete Multiple Task</Button>
      <Button @onClick="stores.deleteAllTask">Delete All Task</Button>
      <Button @onClick="stores.deleteCompletedTasks">Delete Completed Task</Button>
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
