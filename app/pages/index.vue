<script lang="ts" setup>
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto items-stretch">
      <div class="flex flex-col items-center">
        <AuthentificationRegisterForm />
      </div>
      <div  class="flex flex-col items-center" >
        <AuthentificationLoginForm/>
      </div>
    </div>
  </UContainer>

</template>

<style scoped></style>