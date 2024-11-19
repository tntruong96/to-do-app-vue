<template>
  <!-- <div class="input-wrapper">
    <input placeholder="New task" />
    <font-awesome-icon :icon="faPlus" />
  </div> -->
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'

const vueForm = ref({
  size: 'md',
  displayErrors: false,
  schema: {
    page_title: {
      type: 'static',
      content: 'TO DO APP',
      tag: 'h1',
    },
    divider: {
      type: 'static',
      tag: 'hr',
    },
    phone: {
      type: 'text',
      placeholder: 'Add Tasks',
      rules: ['required'],
      fieldName: '',
      allowIncomplete: true,
      unmask: true,
    },
  },
})
</script>

<style lang="scss" scoped>
input {
  border: none;
  background-color: #f5f7f8;
  width: 100%;
  outline: 0px;
  flex: 8 1 0;
}

.svg-inline--fa {
  flex: 2 1 0;
}

.input-wrapper {
  padding: 0.45rem;
  border-radius: 8px;
  background-color: #f5f7f8;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
