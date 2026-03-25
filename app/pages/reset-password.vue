<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot';
import { useAuthStore } from '~/stores/auth.store';
definePageMeta({
    middleware: 'check-reset-token',
    layout: 'reset-password',
});

const route = useRoute()
const token = computed(() => route.query.token as string)
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,}$/;

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
const handleError = useHandleError();

const submitPasswordReset = async (onEvent: FormSubmitEvent<PasswordChageSchema>) => {
    try {
        const response = await authStore.passwordReset(token.value, passwordState.password)
        toast.add({ title: 'Password updated.', description: `${response}`, color: 'success' })
        authStore.logout(false,false);
        navigateTo('/register');
    } catch (error) {
        handleError(error, toast);
    }
}
</script>
<template>
    <div class="flex-1 flex items-center justify-center">
        <div class="flex flex-col pb-0 lg:pb-24">
            <div class="w-full max-w-sm h-full flex flex-col">
                <h1 class="mb-4 text-center text-2xl font-bold">Set new password</h1>
                <p class="text-sm text-center">Your new password must be different from previously used passwords.</p>
                <UForm :schema="passwordChageSchema" :state="passwordState" class="w-full flex flex-col flex-1 pt-6"
                    @submit="submitPasswordReset">
                    <div class="space-y-4 flex-1 items-start">
                        <UFormField label="Password" name="password" class="flex-1">
                            <UInput v-model="passwordState.password" type="password" class="w-full" :autofocus="true" />
                        </UFormField>
                        <UFormField label="Retype your Password" name="passwordCheck" class="flex-1">
                            <UInput v-model="passwordState.passwordCheck" type="password" class="w-full" />
                        </UFormField>
                        <div class="flex justify-center">
                            <ULink to="/register" as="button" class="text-center">Go back to register page.</ULink>
                        </div>
                    </div>
                    <div class="mt-auto pt-4 flex justify-center">
                        <UButton loading-auto type="submit" label="Submit" icon="i-lucide-send" />
                    </div>
                </UForm>
            </div>
        </div>
    </div>
</template>

<style scoped></style>