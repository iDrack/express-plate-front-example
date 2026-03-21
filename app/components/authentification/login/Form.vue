<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import RequestModal from "../password/ResetRequest.vue";

const loginSchema = v.union([
    v.object({
        name: v.pipe(
            v.string(),
            v.trim(),
        ),
        password: v.pipe(
            v.string(),
            v.trim(),
        ),
    }),
    v.object({
        email: v.pipe(
            v.string(),
            v.trim(),
            v.email('Your email address is badly formatted.')
        ),
        password: v.pipe(
            v.string(),
            v.trim(),
        ),
    }),
    v.object({
        name: v.pipe(
            v.string(),
            v.trim(),
        ),
        email: v.pipe(
            v.string(),
            v.trim(),
            v.email('Your email address is badly formatted.')
        ),
        password: v.pipe(
            v.string(),
            v.trim(),
        ),
    })
]);

type LoginSchema = v.InferOutput<typeof loginSchema>;

const loginState = reactive({
    name: "",
    email: "",
    password: "",
});

const authStore = useAuthStore();
const toast = useToast();
const handleError = useHandleError();

const submitLogin = async (onEvent: FormSubmitEvent<LoginSchema>) => {
    try {
        await authStore.login(loginState.name.trim(), loginState.email.toLowerCase().trim(), loginState.password.trim());
        toast.add({ title: 'Login successful.', description: 'You are logged in.', color: 'success' });
        navigateTo('/profile');
    } catch (error) {
        handleError(error, toast);
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <h1 class="mb-4 text-center text-xl">Login</h1>
        <UForm :schema="loginSchema" :state="loginState" class="flex flex-col flex-1" @submit="submitLogin">
            <div class="mx-12 space-y-4 flex-1">
                <UFormField label="Username" name="username" class="flex-1">
                    <UInput v-model="loginState.name" type="text" class="w-full" />
                </UFormField>

                <UFormField label="Email" name="email" class="flex-1">
                    <UInput v-model="loginState.email" type="email" class="w-full" />
                </UFormField>

                <UFormField label="Password" name="password" class="flex-1">
                    <UInput v-model="loginState.password" type="password" class="w-full" />
                </UFormField>

                <div class="flex justify-center">
                    <UModal title="Reset your password.">
                        <UButton variant="link" label="Forgot your password ?" />
                        <template #body>
                            <AuthentificationPasswordResetRequest />
                        </template>
                    </UModal>
                </div>

            </div>
            <div class="mt-auto pt-4 flex justify-center">
                <UButton loading-auto type="submit" label="Login" icon="i-lucide-log-in" />
            </div>
        </UForm>
    </div>
</template>

<style scoped></style>