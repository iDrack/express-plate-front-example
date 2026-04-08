<script setup lang='ts'>
import { useTransfertStore } from '~/stores/transfert.store';

const transfertStore = useTransfertStore();
const handleError = useHandleError();
const toast = useToast();

try {
    await transfertStore.fetchUserFiles(1);

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