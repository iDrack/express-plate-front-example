<script setup lang='ts'>
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute()
const props = withDefaults(defineProps<{
    orientation?: "horizontal" | "vertical" | undefined
}>(), {
    orientation: 'horizontal',
})
const items = computed<NavigationMenuItem[]>(() => [
    {
        label: "Home",
        icon: 'i-lucide-house',
        to: '/',
        active: route.path === '/'
    },
    {
        label: "My profile",
        icon: 'i-lucide-user',
        to: '/profile',
        active: route.path.startsWith('/profile')
    },
    {
        label: "Backend",
        icon: 'i-simple-icons-github',
        to: 'https://github.com/iDrack/express-plate/releases',
        target: '_blank'
    },
    {
        label: "Frontend",
        icon: 'i-simple-icons-github',
        to: 'https://github.com/iDrack/express-plate-front-example/releases',
        target: '_blank'
    },
])
</script>

<template>
    <UNavigationMenu :items="items" :orientation="orientation"/>
</template>

<style scoped></style>