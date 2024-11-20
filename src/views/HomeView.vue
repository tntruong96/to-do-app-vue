<script setup lang="ts">
import FormComponent from '@/components/Form/FormComponent.vue'
import ListTask from '@/components/ListTask/ListTask.vue'
import { reactive } from 'vue'
import { IItemTask } from '@/types/task.type.ts'
import ItemTask from '@/components/ItemTask/ItemTask.vue'

const tasksData = reactive([])

function handleInput(newTask: IItemTask) {
  tasksData.push(newTask)
}

function handleCompleteTask(e) {
  console.log(e)
}
</script>

<template>
  <main>
    <div class="container">
      <FormComponent :addMethod="handleInput" />
      <!-- <ListTask :tasksData="tasksData" /> -->
      <TransitionGroup tag="div" name="fade" class="list-wrapper">
        <ItemTask
          v-for="task in tasksData"
          :taskData="task"
          :key="task.id"
          @onComplete="handleCompleteTask"
        />
      </TransitionGroup>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
}
.container {
  min-width: 400px;
  max-width: 500px;
  height: 100%;
  background: white;
  padding-block: 2rem;
  padding-inline: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 700;
  }
}

.list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 4px 0px;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
