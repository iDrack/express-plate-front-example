<script lang="ts" setup>
const isRegister = ref(false);
</script>

<template>
  <div class="flex-1 flex items-start justify-center w-full">
    <div class="flex flex-col pb-6 lg:pb-24 pt-10 md:pt-20">
      <div class="mb-10 space-y-2">
        <h1 class="text-2xl font-bold">Login to continue.</h1>
        <p class="text-sm" v-if="isRegister">Already have an account ?<UButton variant="link" label="Login here." @click="isRegister = false" />
        </p>
        <p class="text-sm" v-else>Don't have an account ?<UButton variant="link" label="You can register for free." @click="isRegister = true" />
        </p>
      </div>
      <div class="">
        <div v-if="isRegister" class="flex flex-col">
          <AuthentificationRegisterForm />
        </div>
        <div v-else class="flex flex-col">
          <AuthentificationLoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>