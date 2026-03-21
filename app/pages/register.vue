<script lang="ts" setup>
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="flex flex-col pb-6 lg:pb-24 pt-10 md:pt-0">
      <div class="mb-10 space-y-2">
        <h1 class="text-2xl font-bold">Login to continue.</h1>
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
    </div>
  </div>
</template>

<style scoped></style>