<script setup lang="ts">
definePageMeta({
    middleware: 'check-reset-token',
});

const route = useRoute()
console.log(route);

const token = computed(() => route.query.token as string | undefined)
//redirect to index if token is undefined
</script>
<template>
    <div>

    </div>
</template>

<style scoped>

</style>