<script setup lang='ts'>
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader>
            <template #title>
                Express-Plate
            </template>
            <template #right>
                <HeaderActionsDefault/>
            </template>
        </UHeader>
        <UContainer class="flex-1 flex">
            <slot />
        </UContainer>
    </div>
</template>

<style scoped>
</style>