<template>
  <TransitionGroup tag="div" name="fade" class="list-wrapper">
    <!-- <slot /> -->
    <ItemTask v-for="task in tasksData" :taskData="task" :key="task.id" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { type IPropListTask } from '@/types/task.type.ts'
import ItemTask from '@/components/ItemTask/ItemTask.vue'

const { tasksData } = defineProps<IPropListTask>()
</script>

<style lang="scss" scoped>
.list-wrapper {
  padding: 24px 0px;
  width: 100%;
  position: relative;
  display: flex;
  gap: 24px;
  flex-direction: column;
}
</style>
