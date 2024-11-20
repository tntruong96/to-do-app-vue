<template>
  <li class="item-wrapper">
    <input type="checkbox" />
    <p
      @mouseenter="showPopup = true"
      @mouseout="showPopup = false"
      @click="$emit('onComplete', taskData.id)"
    >
      {{ taskData?.title }}
    </p>
    <FontAwesomeIcon :icon="faX" size="xs" />
    <Transition name="">
      <span class="item-popup" v-if="showPopup">{{ taskData?.title }}</span>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import { IItemTask } from '@/types/task.type.'
import { IPropsItemTask } from '@/types/task.type'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'

const { taskData } = defineProps<IPropsItemTask>()
const emit = defineEmits(['onDelete', 'onComplete'])

const showPopup = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.item-wrapper {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
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
