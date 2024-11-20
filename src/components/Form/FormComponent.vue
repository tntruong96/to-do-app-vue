<template>
  <div class="input-wrapper">
    <input @keyup.enter="handleEnter" placeholder="New task" />
    <font-awesome-icon class="input-icon" :icon="faPlus" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { IPropsInput, IItemTask } from '@/types/task.type.ts'
import { EStatusTask } from '@/enums/task.enum.ts'

const { addMethod } = defineProps<IPropsInput>()

function handleEnter(e) {
  const newTask: IItemTask = {
    id: Math.random(),
    title: e.target.value,
    status: EStatusTask.INCOMPLETE,
  }
  addMethod(newTask)
  e.target.value = ''
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
