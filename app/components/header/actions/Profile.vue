<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
</script>

<template>
    <UTooltip text="Go to your profile">
        <UButton key="btn-profile" color="neutral" variant="ghost" to="/profile" icon="i-lucide-user"
            aria-label="Profile" />
    </UTooltip>
    <UTooltip text="Log-out">
        <UButton key="btn-logout" color="neutral" variant="ghost" icon="i-lucide-log-out" @click="authStore.logout"
            aria-label="Log-out" />
    </UTooltip>
</template>

<style scoped></style>