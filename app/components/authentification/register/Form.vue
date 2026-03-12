<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordCheck = ref("");

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$/;

const authStore = useAuthStore();

const isPasswordValid = computed(() => passwordRegex.test(password.value));
const passwordsMatch = computed(() => password.value === passwordCheck.value);
const canRegister = computed(() => 
    username.value !== "" && 
    email.value !== "" && 
    isPasswordValid.value && 
    passwordsMatch.value
)
const registerUser = async () => {
    if(!passwordRegex.test(password.value)) {
        //Show toast
        return
    }
    if(password.value !== passwordCheck.value) {
        //Show toast
        return
    }
    if(username.value != "" && email.value != "" && password.value != "" && password.value === passwordCheck.value) {
        authStore.register(username.value, email.value, password.value);
        console.log(authStore.authToken);
    }
}
</script>

<template>
    <div>
        <input type="text" name="Username" id="username" v-model="username" placeholder="Enter your username"/>
        <input type="email" name="Email" id="email" v-model="email" placeholder="Enter your e-mail address">
        <input type="password" name="Password" id="password" v-model="password" placeholder="Enter your password">
        <div v-if="!isPasswordValid">
            <div>
            Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial.
            </div>
        </div>
        <input type="password" name="Password validation" id="passwordCheck" v-model="passwordCheck" placeholder="Confirm your password">
        <div v-if="!passwordsMatch">
            Les mots de passes ne correspondent pas.
        </div>
        <button type="submit" @click="registerUser" :disabled="!canRegister">Register</button>
    </div>
</template>

<style scoped></style>