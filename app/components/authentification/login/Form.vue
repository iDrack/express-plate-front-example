<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";

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
])


v.object({
    name: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(3, 'Your username must contain at least 3 characters')
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
});

type LoginSchema = v.InferOutput<typeof loginSchema>;

const loginState = reactive({
    name: "",
    email: "",
    password: "",
});


const authStore = useAuthStore();
const toast = useToast();

const submitLogin = async (onEvent: FormSubmitEvent<LoginSchema>) => {
    try {
        authStore.login(loginState.name.trim(), loginState.email.trim(), loginState.password.trim());
        toast.add({ title: 'Login successful.', description: 'You are logged in.', color: 'success' });
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
    <h2 class="my-4">Login</h2>
    <UForm :schema="loginSchema" :state="loginState" class="space-y-4" @submit="submitLogin">
        <UFormField label="Username" name="username">
            <UInput v-model="loginState.name" type="text" />
        </UFormField>

        <UFormField label="Email" name="email">
            <UInput v-model="loginState.email" type="email" />
        </UFormField>

        <UFormField label="Password" name="password">
            <UInput v-model="loginState.password" type="password" />
        </UFormField>
        <UButton type="submit" label="Login" icon="mdi-login" />
    </UForm>
</template>

<style scoped></style>