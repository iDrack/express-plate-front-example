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

})

</script>

<template>
    <div class="h-full flex flex-col pt-4 pb-4">
        <div v-if="isLoading" class="">
            <TransfertBrowseSkeleton />
        </div>
        <div v-else-if="userFilesData.length > 0">
            <ul v-for="file in userFilesData" key="file.id">
                <li>{{ file.id }} : {{ file.originalName }}</li>
            </ul>
        </div>
        <div v-else class="h-full flex flex-col">
            <TransfertBrowseEmpty />
        </div>
    </div>
</template>

<style scoped></style>