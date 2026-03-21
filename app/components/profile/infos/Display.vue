<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const profile = computed(() => authStore.profile)
</script>

<template>
    <div class="my-4 px-16">
        <div class="flex flex-1 w-full mx-auto justify-between">
            <div class="flex space-x-4">
                <div>
                    <UAvatar :alt="profile.name" size="3xl" loading="lazy" />
                </div>

                <div class="flex flex-col items-start justify-end space-y-2">
                    <div class="text-3xl">{{ profile.name }}</div>
                    <div class="flex space-x-4">
                        <div class="text-md"> {{ profile.email }} </div>
                    </div>
                </div>
            </div>

            <div>
                <UModal title="Edit your profile">
                    <UTooltip text="Edit Profile">
                        <UButton color="neutral" variant="ghost" icon="i-lucide-user-pen" />
                        <template #body>
                            <ProfileInfosEdit />
                        </template>
                    </UTooltip>
                </UModal>
            </div>
        </div>
    </div>
    <USeparator orientation="horizontal" color="neutral" type="solid" size="sm" />


</template>

<style scoped></style>