import type { FileMetaData, TransfertResponse } from "./transfert.type";

export const useTransfertStore = defineStore("transfert", () => {
    const authenticatedFetch = useAuthenticatedFetch();
    const apiUrl = `${useRuntimeConfig().public.apiUrl}/file`;
    const isLoading = ref(false);
    const userFiles = ref<Array<FileMetaData>>([])

    const uploadFiles = async (files: FileList | File[]):Promise<TransfertResponse>  => {
        try {
            isLoading.value = true
            const formData = new FormData();
            if (files instanceof FileList) {
                Array.from(files).forEach((file) => {
                    formData.append("files", file);
                });
            } else {
                files.forEach((file) => {
                    formData.append("files", file);
                });
            }
    
            const response = await authenticatedFetch<TransfertResponse>(`${apiUrl}/upload`, {
                method: "POST",
                body: formData,
            });
    
            return response;
        } catch (error) {
            throw error
        } finally {
            isLoading.value = false
        }
    };

    const resetUserFiles = () => {
        userFiles.value = [];
    }

    return {
        isLoading: readonly(isLoading),
        userFiles: readonly(userFiles),
        uploadFiles,
        resetUserFiles,
    }
});
