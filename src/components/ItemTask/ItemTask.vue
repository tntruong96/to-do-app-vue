<template>
  <li class="item-wrapper">
    <input
      type="checkbox"
      :id="taskData.id.toString()"
      v-model="data"
      :true-value="dynamicTrueValue"
      :false-value="dynamicFalseValue"
    />
    <p
      @mouseenter="showPopup = true"
      @mouseout="showPopup = false"
      :class="taskData.status === EStatusTask.COMPLETED && 'completed'"
    >
      {{ taskData?.title }}
    </p>
    <FontAwesomeIcon @click="store.handleDelete(taskData.id)" :icon="faX" size="xs" />
    <Transition name="">
      <span class="item-popup" v-if="showPopup">{{ taskData?.title }}</span>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import { type IItemTask, type IPropsItemTask } from '@/types/task.type.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { EStatusTask } from '@/enums/task.enum'
import { useTaskStore } from '@/stores/task'
const { taskData } = defineProps<IPropsItemTask>()
const data = ref()
const dynamicTrueValue = ref({ value: true, id: taskData.id })
const dynamicFalseValue = ref({ value: false, id: taskData.id })
const store = useTaskStore()

const emit = defineEmits(['onDelete', 'onComplete', 'onSelect'])

const showPopup = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.item-wrapper {
  color: black;
  cursor: pointer;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 12px;
  padding: 14px;
  position: relative;
  background-color: var(--secondary-c);
  border-radius: 8px;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: inline-block;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 14px;
      width: 0px;
      height: 1px;
      display: block;
      background: black;
      transition: all 500ms ease-in;
    }
    &.completed::after {
      width: 100%;
    }
  }
  .item-popup {
    position: absolute;
    top: 50px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 8px;
    z-index: 2;
    background-color: white;
    /* display: none; */
  }
}
</style>
