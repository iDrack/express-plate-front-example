<script setup lang='ts'>
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader />
        <UContainer class="flex-1 flex items-center justify-center">
            <slot />
        </UContainer>
    </div>
</template>

<style scoped></style>