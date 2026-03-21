<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const authState = computed(() => ({
    isLoading: authStore.isLoading,
    isAuthenticated: authStore.isAuthenticated
}));
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader>
            <template #title>
                Express-Plate
            </template>
            <HeaderUserGreeting />
             <template #right>
                <template v-if="authState.isLoading">
                </template>

                <template v-else-if="authState.isAuthenticated">
                    <HeaderActionsProfile/>
                </template>

                <template v-else>
                    <HeaderActionsRegister/>
                </template>
                <HeaderActionsDefault/>
            </template>
        </UHeader>
        <UContainer class="flex-1 flex items-center justify-center">
            <slot />
        </UContainer>
    </div>
</template>

<style scoped></style>