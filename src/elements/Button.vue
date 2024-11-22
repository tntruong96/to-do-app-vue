<template>
  <button v-bind="props" @click="$emit('onClick')" class="button"><slot /></button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface IButtonProps {
  props: {}
}
const props = ref()
const emit = defineEmits(['onClick'])
</script>

<style lang="scss" scoped>
.button {
  border: none;
  background-color: var(--quaternary-c);
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  width: fit-content;
  cursor: pointer;
}
</style>
