<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot';
import { useAuthStore } from '~/stores/auth.store';
definePageMeta({
    middleware: 'check-reset-token',
});

const route = useRoute()
console.log(route);

const token = computed(() => route.query.token as string)
const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$/;

const passwordChageSchema = v.object({
    password: v.pipe(
        v.string(),
        v.trim(),
        v.regex(passwordRegex, 'Your password must have 8 characters minimum, special characters, upper case and lower case characters.'),
    ),
    passwordCheck: v.pipe(
        v.string(),
        v.trim(),
        v.check((input) => input === passwordState.password, "Your passwords doesn't match."),
    )
});

type PasswordChageSchema = v.InferOutput<typeof passwordChageSchema>

const passwordState = reactive({
    password: "",
    passwordCheck: "",
});

const authStore = useAuthStore();
const toast = useToast();
const submitPasswordReset = async (onEvent: FormSubmitEvent<PasswordChageSchema>) => {
    //Reset Password and check the response
    try {
        const response = await authStore.passwordReset(token.value, passwordState.password)
        console.log(response);
        
        toast.add({ title: 'Password updated.', description: `${response}`, color: 'success' })
        authStore.logout();
        navigateTo('/')
    } catch (error) {
        console.log(error);
        
        if (isNuxtError(error)) {
            toast.add({ title: 'An error has occurred.', description: `${error.statusCode} : ${error.message}`, color: 'error' });
        } else {
            toast.add({ title: 'An error has occurred.', description: `${error}`, color: 'error' });
        }
    }
}
</script>
<template>
    <UContainer class="min-h-screen flex flex-col items-center justify-center">
        <div class="w-full max-w-md h-full flex flex-col">
            <h1 class="mb-4 text-center text-xl">Submit a new password</h1>
            <UForm :schema="passwordChageSchema" :state="passwordState" class="w-full flex flex-col flex-1"
                @submit="submitPasswordReset">
                <div class="space-y-4 flex-1">
                    <UFormField label="Password" name="password">
                        <UInput v-model="passwordState.password" type="password"/>
                    </UFormField>

                    <UFormField label="Retype your Password" name="passwordCheck">
                        <UInput v-model="passwordState.passwordCheck" type="password" />
                    </UFormField>
                </div>
                <div class="mt-auto pt-4 flex justify-center">
                    <UButton type="submit" label="Submit" icon="mdi-send" />
                </div>
            </UForm>
        </div>
    </UContainer>
</template>

<style scoped></style>