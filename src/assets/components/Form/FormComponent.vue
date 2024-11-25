<template>
  <div class="input-wrapper">
    <input @keyup.enter="handleEnter" placeholder="New task" />
    <font-awesome-icon class="input-icon" :icon="faPlus" />
  </div>
</template>

<script setup lang="ts">
import { EStatusTask } from '@/assets/enums/task.enum'
import { useTaskStore } from '@/assets/stores/task'
import { type IItemTask, type IPropsInput } from '@/assets/types/task.type'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// const { addMethod } = defineProps<IPropsInput>()
const store = useTaskStore()

function handleEnter(e: Event) {
  const target = e.target && (e.target as HTMLInputElement)
  const newTask: IItemTask = {
    id: Math.random(),
    title: target?.value ?? '',
    status: EStatusTask.INCOMPLETE,
  }
  if (target?.value) {
    store.handleAddTask(newTask)
    target.value = ''
  }
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  background-color: #f5f7f8;
  width: 100%;
  outline: 0px;
  /* flex: 8 1 0; */
}

.input-wrapper {
  padding: 1rem;
  border-radius: 8px;
  background-color: #f5f7f8;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
