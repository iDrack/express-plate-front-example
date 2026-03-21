<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const profile = computed(() => authStore.profile);
const isLoading = computed(() => authStore.isLoading)
const isModalOpen = ref(false)
</script>

<template>
    <div v-if="profile">
        <div class="my-4 lg:px-16">
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
                    <UModal title="Edit your profile" v-model:open="isModalOpen">
                        <UTooltip text="Edit Profile">
                            <UButton color="neutral" variant="ghost" icon="i-lucide-user-pen" />
                        </UTooltip>
                        <template #body>
                            <ProfileInfosEdit @profile-updated="isModalOpen = false"/>
                        </template>
                    </UModal>
                </div>
            </div>
        </div>
        <USeparator orientation="horizontal" color="neutral" type="solid" size="sm" />
    </div>
    <div v-else-if="!profile">
        <ProfileInfosSkeleton />
    </div>

</template>

<style scoped></style>