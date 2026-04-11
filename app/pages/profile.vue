<script setup lang='ts'>
import { useTransfertStore } from '~/stores/transfert.store';

const transfertStore = useTransfertStore();
const route = useRoute()
const handleError = useHandleError();
const toast = useToast();

const getPageFromQuerry = (value: unknown) => {
    const page = Number(value)
    return Number.isInteger(page) && page > 0 ? page : 1
}

watch (() => route.query.page, 
    async (pageQuery) => {
        try {
            transfertStore.currentPage = getPageFromQuerry(pageQuery);
            await transfertStore.fetchUserFiles();
        } catch (error) {
            handleError(error, toast)
        }
    })

try {
    await transfertStore.fetchUserFiles();
} catch (error) {
    handleError(error, toast)
}
</script>

<template>
    <div class="flex-1 flex">
        <div class="flex flex-col w-full pb-0 ">
            <div class="w-full h-full flex flex-col items-stretch">
                <ProfileInfosDisplay />
                <!--Display file browsing component-->
                <TransfertBrowseList />
            </div>

            <div>
                <!--Display widget to upload files-->
                <TransfertUploadDragAndDrop />
            </div>

        </div>
    </div>
</template>

<style scoped></style>