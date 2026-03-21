<script setup lang='ts'>
</script>

<template>
    <div class="my-4 px-16">
        <div class="flex flex-1 w-full mx-auto justify-between">
            <div class="flex space-x-4">
                <div>
                    <USkeleton class="size-12 rounded-full" />
                </div>

                <div class="flex flex-col items-start justify-end space-y-2">
                    <USkeleton class="h-9 w-48" />
                    <div class="flex space-x-4">
                        <USkeleton class="h-6 w-64" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <USeparator orientation="horizontal" color="neutral" type="solid" size="sm" />
</template>

<style scoped></style>