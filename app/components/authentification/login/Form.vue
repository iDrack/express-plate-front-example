<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const username = ref("");
const email = ref("");
const password = ref("");

const canLogin = computed(() => (username.value !=="" || email.value !=="") && password.value!== "")

const authStore = useAuthStore();

const loginUser = async () => {
    if((username.value != "" || email.value != "") && password.value != "" ) {
        authStore.login(username.value, email.value, password.value);
        console.log(authStore.authToken);
    }
}
</script>

<template>
    <div>
        <input type="text" name="Username" id="username" v-model="username" placeholder="Enter your username"/>
        <input type="email" name="Email" id="email" v-model="email" placeholder="Enter your e-mail address">
        <input type="password" name="Password" id="password" v-model="password" placeholder="Enter your password">
        <button type="submit" @click="loginUser" :disabled="!canLogin">Login</button>
    </div>
</template>

<style scoped></style>