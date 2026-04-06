<script setup lang='ts'>
import type { FormSubmitEvent } from '@nuxt/ui'
import { useTransfertStore } from '~/stores/transfert.store';
import * as v from "valibot";

const fileUploadSchema = v.object({
  files: v.pipe(
    v.array(
      v.file()
    ),
    v.minLength(1, "Please provide at least 1 file to upload."),
    v.maxLength(10, "You can only upload 10 files at a time.")
  )
});

type FileUploadSchema = v.InferOutput<typeof fileUploadSchema>

const fileUploadState = reactive<Partial<FileUploadSchema>>({
  files: []
});

const transfertStore = useTransfertStore();
const toast = useToast();
const handleError = useHandleError();

const isFileCountValid = computed(() => {
  const count = fileUploadState.files?.length ?? 0
  return count >= 1 && count <= 10
})

function detectDirectory(event: DragEvent) {
  const items = event.dataTransfer?.items;
  console.log("items :", items);

  if (!items) return false;

  return Array.from(items).some((item) => {
    const entry = item.webkitGetAsEntry?.()
    return entry?.isDirectory === true;
  })
}

const handleDrop = (event: DragEvent) => {
  if (!detectDirectory(event)) {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  toast.add({
    title: 'Upload refused',
    description: 'Folders are not allowed. Please drop files only.',
    color: 'info',
    icon: 'i-lucide-folder-x'
  })
}

const sendFiles = async (event: FormSubmitEvent<FileUploadSchema>) => {
  try {
    const response = await transfertStore.uploadFiles(event.data.files);
    toast.add({
      title: "Files uploaded.",
      description: "Files successfully uploaded to your account.",
      color: "success",
      icon: "i-lucide-file-check"
    });
    fileUploadState.files = []
  } catch (error) {
    handleError(error, toast);
  }
}
</script>

<template>
  <div>
    <UForm :schema="fileUploadSchema" :state="fileUploadState" @submit="sendFiles"
      class="flex flex-col flex-1 space-y-4">
      <UFormField>
        <div @drop.capture="handleDrop">
          <UFileUpload multiple :dropzone="true" v-model="fileUploadState.files" label="Upload your files here" />
        </div>
      </UFormField>

      <UButton type="submit" label="Submit" icon="i-lucide-file-up" block
        :variant="isFileCountValid ? 'solid' : 'ghost'" :disabled="!isFileCountValid" />
    </UForm>
  </div>
</template>

<style scoped></style>