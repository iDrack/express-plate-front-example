<script setup lang="ts">
const route = useRoute()
const token = computed(() => route.query.token as string | undefined)
//redirect to index if token is undefined
</script>
<template>
    <div>

    </div>
</template>

<style scoped>

</style>