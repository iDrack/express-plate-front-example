<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const submitLogout = async () => {
    await authStore.logout(true, false)
}
</script>

<template>
    <UTooltip text="Log-out">
        <UButton key="btn-logout" color="neutral" variant="ghost" icon="i-lucide-log-out" @click="submitLogout"
            aria-label="Log-out" />
    </UTooltip>
</template>

<style scoped></style>