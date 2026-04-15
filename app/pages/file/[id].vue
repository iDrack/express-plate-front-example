<script setup lang='ts'>
import { useTransfertStore } from '~/stores/transfert.store';

const route = useRoute()
const transfertStore = useTransfertStore()
const toast = useToast()
const handleError = useHandleError()
const blob = ref()
const mimeType = ref("")
const filename = ref('undefined');

definePageMeta({
    middleware: 'check-file-access'
})

try {
    blob.value = await transfertStore.getFile(Number(route.params.id))
    if (blob.value) {
        mimeType.value = blob.value.type
        const response = await transfertStore.fetchFileInfo(Number(route.params.id));
        filename.value = response.originalName;
    }
} catch (error) {
    handleError(error, toast)
    navigateTo('/profile')
}

const displayPreview = () => {
    return URL.createObjectURL(blob.value);
}

const displayPdf = async () => {
    const pdfUrl = URL.createObjectURL(blob.value)
    window.open(pdfUrl, '_blank')
}

const deleteFile = async () => {
    try {
        const response = await transfertStore.deleteFile(Number(route.params.id));
        if (response.status === '400') {
            toast.add({ title: 'Please wait.', description: response.data, color: 'info', icon: 'i-lucide-clock' });
            return;
        }
        toast.add({ title: 'File deleted.', description: response.data, color: 'success', icon: 'i-lucide-check' });
        navigateTo('/profile')
    } catch (error) {
        handleError(error, toast)
    }
}

const downloadFile = async () => {
    try {
        await transfertStore.downloadFile(Number(route.params.id), filename.value)
    } catch (error) {
        handleError(error, toast)
    }
}
</script>

<template>
    <div class="flex flex-1">
        <div class="flex flex-col w-full pb-0">
            <div class="flex space-x-2 py-4">
                <UTooltip text="Go back to file selection">
                    <UButton to="/profile" icon="i-lucide-arrow-big-left-dash" color="neutral" variant="outline" />
                </UTooltip>
                <h1 class="text-lg md:text-xl">{{ filename }}</h1>
            </div>
                <USeparator orientation="horizontal" color="neutral" type="solid" size="sm" class="pb-6" />

            <div v-if="mimeType.includes('image')">
                <img :src="displayPreview()" />
            </div>
            <div v-else-if="mimeType.includes('pdf')">
                <iframe :src="displayPreview()" type="application/pdf" width="100%" height="800"
                    class="border rounded"></iframe>
                    <div>
                        <UButton variant="link" label="See file in fullscreen" @click="displayPdf"/>
                    </div>
            </div>
            <div v-else class="flex items-center justify-center p-8 md:h-[600px]">
                <UAlert icon="i-lucide-file-x" color="neutral" variant="subtle" title="Preview unavailable"
                    description="This file type cannot be displayed in the browser." class="md:h-full items-center"/>
            </div>
            <div class="flex justify-end space-x-2 pt-6">
                <UButton label="Download" icon="i-lucide-download" @click="downloadFile()" color="neutral"
                    variant="outline" />
                <UButton label="Delete" icon="i-lucide-trash" @click="deleteFile()" color="error" variant="outline" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>