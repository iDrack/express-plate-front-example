<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import * as v from 'valibot';
import type { FormSubmitEvent } from "@nuxt/ui";

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$/;

const registerSchema = v.object({
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
        v.regex(passwordRegex, 'Your password must have 8 characters minimum, special characters, upper case and lower case characters.'),
    ),
    passwordCheck: v.pipe(
        v.string(),
        v.trim(),
        v.check((input) => input === registerState.password, "Your passwords doesn't match."),
    )
});

type RegisterSchema = v.InferOutput<typeof registerSchema>;

const registerState = reactive({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
});

const authStore = useAuthStore();
const toast = useToast();
const handleError = useHandleError();

const submitRegister = (onEvent: FormSubmitEvent<RegisterSchema>) => {
    try {
        authStore.register(registerState.name.trim(), registerState.email.trim(), registerState.password.trim());
        toast.add({ title: 'Account created.', description: 'Your account has been registered.', color: 'success' });
    } catch (error) {
        handleError(error, toast);
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <h1 class="mb-4 text-center text-xl">Register</h1>
        <UForm :schema="registerSchema" :state="registerState" class="flex flex-col flex-1" @submit="submitRegister">
            <div class="mx-12 space-y-4 flex-1">
                <UFormField label="Username" name="username" class="flex-1">
                    <UInput v-model="registerState.name" type="text" class="w-full" />
                </UFormField>

                <UFormField label="Email" name="email" class="flex-1">
                    <UInput v-model="registerState.email" type="email" class="w-full" />
                </UFormField>

                <UFormField label="Password" name="password" class="flex-1"
                    :ui="{ error: 'block min-h-10 whitespace-normal break-words' }">
                    <UInput v-model="registerState.password" type="password" class="w-full" />
                </UFormField>

                <UFormField label="Retype your Password" name="passwordCheck" class="flex-1"
                    :ui="{ error: 'block min-h-10 whitespace-normal break-words' }">
                    <UInput v-model="registerState.passwordCheck" type="password" class="w-full" />
                </UFormField>
            </div>
            <div class="mt-auto pt-4 flex justify-center">
                <UButton type="submit" label="Register" icon="mdi-plus" />
            </div>
        </UForm>
    </div>

</template>

<style scoped></style>