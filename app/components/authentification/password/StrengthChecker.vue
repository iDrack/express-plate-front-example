<script setup lang="ts">
const props = defineProps<{
    password: string
}>()

const criteria = computed(() => ({
    length: props.password.length >= 8,
    uppercase: /[A-Z]/.test(props.password),
    lowercase: /[a-z]/.test(props.password),
    number: /[0-9]/.test(props.password),
    special: /[_#?!@$%^&*-]/.test(props.password)
}))

const allValid = computed(() => Object.values(criteria.value).every(v => v))
</script>

<template>
    <div class="space-y-2 text-sm">
        <p class="font-medium">Your password must have:</p>
        <ul class="space-y-1 ml-10">
            <li class="flex items-center gap-2">
                <UIcon 
                    :name="criteria.length ? 'i-lucide-check-circle' : 'i-lucide-circle'" 
                    :class="criteria.length ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="criteria.length ? 'text-green-500' : ''">
                    At least 8 characters
                </span>
            </li>
            <li class="flex items-center gap-2">
                <UIcon 
                    :name="criteria.uppercase ? 'i-lucide-check-circle' : 'i-lucide-circle'" 
                    :class="criteria.uppercase ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="criteria.uppercase ? 'text-green-500' : ''">
                    1 uppercase character
                </span>
            </li>
            <li class="flex items-center gap-2">
                <UIcon 
                    :name="criteria.lowercase ? 'i-lucide-check-circle' : 'i-lucide-circle'" 
                    :class="criteria.lowercase ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="criteria.lowercase ? 'text-green-500' : ''">
                    1 lowercase character
                </span>
            </li>
            <li class="flex items-center gap-2">
                <UIcon 
                    :name="criteria.number ? 'i-lucide-check-circle' : 'i-lucide-circle'" 
                    :class="criteria.number ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="criteria.number ? 'text-green-500' : ''">
                    1 number
                </span>
            </li>
            <li class="flex items-center gap-2">
                <UIcon 
                    :name="criteria.special ? 'i-lucide-check-circle' : 'i-lucide-circle'" 
                    :class="criteria.special ? 'text-green-500' : 'text-gray-400'"
                />
                <span :class="criteria.special ? 'text-green-500' : ''">
                    1 special character (_#?!@$%^&*-)
                </span>
            </li>
        </ul>
    </div>
</template>