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
        <UHeader mode="drawer">
            <template #title>
                Express-Plate
            </template>
            <HeaderNavigationDefault />
            <template #right>
                <template v-if="authState.isLoading">
                </template>

                <template v-else-if="authState.isAuthenticated">
                    <HeaderActionsProfile />
                </template>

                <template v-else>
                    <HeaderActionsRegister />
                </template>
                <HeaderActionsDefault />
            </template>
            <template #body>
                <HeaderNavigationDefault :orientation="'vertical'" />
            </template>
        </UHeader>
        <UContainer class="flex-1 flex">
            <slot />
        </UContainer>
    </div>
</template>

<style scoped></style>