<script lang="ts" setup>
</script>

<template>
  <UContainer class="min-h-screen flex flex-col items-center justify-center">
    <div class="mb-10 space-y-2">
        <h1 class="text-2xl">Login to continue.</h1>
        <p class="text-sm">Don't have an account ? You can register for free.</p>
    </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto items-stretch">
        <div class="flex flex-col items-center">
          <AuthentificationLoginForm />
        </div>
        <div class="flex flex-col items-center">
          <AuthentificationRegisterForm />
        </div>
      </div>
  </UContainer>
</template>

<style scoped></style>