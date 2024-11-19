<script setup lang="ts">
import Form from '@/components/Form/FormComponent.vue'
</script>

<template>
  <main>
    <div class="container">
      <Form />
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
</style>
