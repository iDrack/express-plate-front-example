<script setup lang='ts'>
import { useTransfertStore } from '~/stores/transfert.store';
import type { FileMetaData } from '~/stores/transfert.type';

const transfertStore = useTransfertStore();
const toast = useToast()
const handleError = useHandleError();

const {
    userFilesData,
    currentPage,
    totalPages,
    hasNext,
    isLoading,
} = storeToRefs(transfertStore)

onMounted(async () => {
    try {
        await transfertStore.fetchUserFiles(1);

    } catch (error) {
        handleError(error, toast)
    }
})

</script>

<template>
    <div>
        <ul v-for="file in userFilesData" key="file.id">
            <li>{{ file.id }} : {{ file.originalName }}</li>
        </ul>
    </div>
</template>

<style scoped></style>