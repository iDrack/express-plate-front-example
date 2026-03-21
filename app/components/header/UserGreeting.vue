<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();

const username = computed(() => authStore.profile?.name)
</script>

<template>
    <span v-if="username">
        Welcome {{ username }} !
    </span>
</template>

<style scoped></style>