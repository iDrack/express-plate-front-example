<script setup lang="ts">
const rows = 10

const headerWidths = ["w-12", "w-40", "w-20", "w-24", "w-24"]
const bodyWidths = ["w-8", "w-56", "w-16", "w-20", "w-20"]
</script>

<template>
    <div class="overflow-x-auto">
        <div class="min-w-180 overflow-hidden rounded-xl border border-default bg-default">
            <div
                class="grid grid-cols-[80px_minmax(220px,1fr)_120px_140px_120px] gap-4 border-b border-default px-4 py-3">
                <USkeleton v-for="(width, index) in headerWidths" :key="index" class="h-4" :class="width" />
            </div>

            <div v-for="row in rows" :key="row"
                class="grid grid-cols-[80px_minmax(220px,1fr)_120px_140px_120px] items-center gap-4 border-b border-default px-4 py-4 last:border-b-0">
                <USkeleton class="h-4 rounded-full" :class="bodyWidths[0]" />
                <USkeleton class="h-4" :class="bodyWidths[1]" />
                <USkeleton class="h-4" :class="bodyWidths[2]" />
                <USkeleton class="h-4" :class="bodyWidths[3]" />
                <USkeleton class="h-8 rounded-md" :class="bodyWidths[4]" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>