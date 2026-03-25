<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot'
import { useAuthStore } from '~/stores/auth.store';

const authStore = useAuthStore();
const toast = useToast();
const handleError = useHandleError();

const profileSchema = v.object({
    name: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, 'Your username must contain at least 3 characters')
    ),
    email: v.pipe(
        v.string(),
        v.trim(),
        v.email('Your email address is badly formatted.')
    )
})

type ProfileSchema = v.InferOutput<typeof profileSchema>;

const profileState = reactive({
    name: authStore.profile?.name || "",
    email: authStore.profile?.email || "",
});

const emit = defineEmits(['profileUpdated'])

const submitProfileEdit = async (onEvennt: FormSubmitEvent<ProfileSchema>) => {
    try {
        await authStore.updateProfile(profileState.name, profileState.email);
        toast.add({ title: 'Profile updated', description: 'Profile successfully updated.', color: 'success', icon: "i-lucide-check" });
        emit('profileUpdated');
    } catch (error) {
        handleError(error, toast)
    }
}

</script>

<template>
    <div class="h-full flex flex-col">
        <div class="space-y-4 flex-1 ">
            <UForm :schema="profileSchema" :state="profileState" class="flex flex-col flex-1 space-y-4"
                @submit="submitProfileEdit">
                <UFormField label="Username" name="name">
                    <UInput v-model="profileState.name" type="text" />
                </UFormField>
                <UFormField label="Email" name="email">
                    <UInput v-model="profileState.email" type="email" />
                </UFormField>
                <div class="space-y-4">
                    <UButton loading-auto type="submit" label="Update profile" icon="i-lucide-user-pen" />
                </div>
            </UForm>
        </div>
    </div>
</template>

<style scoped></style>