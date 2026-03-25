<script setup lang='ts'>
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute()
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
  <UNavigationMenu :items="items" />
</template>

<style scoped>
</style>