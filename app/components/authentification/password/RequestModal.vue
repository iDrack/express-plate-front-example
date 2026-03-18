<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot'
import { useAuthStore } from '~/stores/auth.store';

const passwordResetRequestSchema = v.object({
    email: v.pipe(
        v.string(),
        v.trim(),
        v.email('Please provide a correct e-mail address.')
    ),
});

type PasswordResetRequestSchema = v.InferOutput<typeof passwordResetRequestSchema>

const passwordResetRequestState = reactive({
    email: ""
});

const authStore = useAuthStore();
const toast = useToast();

const submitRequest = async (onEvent: FormSubmitEvent<PasswordResetRequestSchema>) => {
    try {
        const response = await authStore.makePasswordResetRequest(passwordResetRequestState.email);
        toast.add({ title: 'Request sent.', description: `${response}`, color: 'success' })
    } catch (error) {
        if (isNuxtError(error)) {
            toast.add({ title: 'An error has occurred.', description: `${error.statusCode} : ${error.message}`, color: 'error' });
        } else {
            toast.add({ title: 'An error has occurred.', description: `${error}`, color: 'error' });
        }
    }
}
</script>

<template>
    <div class="h-full flex flex-col">
        <p class="mb-6 text-sm">We'll try to find your account via the e-mail address you provide us and send you instructions on how to reset
            your password.</p>
        <div class="space-y-4 flex-1 ">
            <UForm :schema="passwordResetRequestSchema" :state="passwordResetRequestState"
                class="flex flex-col flex-1 space-y-4" @submit="submitRequest">
                <UFormField label="Email" name="email">
                    <UInput v-model="passwordResetRequestState.email" type="email" />
                </UFormField>
                <div class="space-y-4">
                    <UButton type="submit" label="Send reset link" icon="mdi-send" />
                </div>
            </UForm>
        </div>
    </div>
</template>

<style scoped></style>