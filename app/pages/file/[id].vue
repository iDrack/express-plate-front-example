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

const readText = async () => {
    const text = await blob.value.text()
    return text;
}
//TODO: add navigation buttons (ex: go back)
//TODO: update UI, make page pretty :3

const deleteFile = async () => {
    try {
        const response = await transfertStore.deleteFile(Number(route.params.id));
        if (response.status === '400') {
            toast.add({ title: 'Please wait.', description: response.data, color: 'info', icon: 'i-lucide-clock' });
            return;
        }
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
        <div class="flex flex-col w-full pb-0 ">
            <div v-if="mimeType.includes('image')">
                <img :src="displayPreview()" />
            </div>
            <div v-else-if="mimeType.includes('pdf')">
                <iframe :src="displayPreview()" type="application/pdf" width="100%" height="800"
                    class="border rounded"></iframe>
            </div>
            <div v-else class="flex items-center justify-center p-8">
                <UAlert icon="i-lucide-file-x" color="neutral" variant="subtle" title="Preview unavailable"
                    description="This file type cannot be displayed in the browser." />
            </div>
            <div class="flex justify-end space-x-2">
                <UButton label="Download" icon="i-lucide-download" @click="downloadFile()" color="neutral" variant="outline"/>
                <UButton label="Delete" icon="i-lucide-trash" @click="deleteFile()" color="error" variant="outline"/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>