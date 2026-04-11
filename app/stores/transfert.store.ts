import type {
    FileMetaData,
    TransfertDeleteResponse,
    TransfertUploadResponse,
    UserFilesGetResponse,
} from "./transfert.type";

export const useTransfertStore = defineStore("transfert", () => {
    const authenticatedFetch = useAuthenticatedFetch();
    const apiUrl = `${useRuntimeConfig().public.apiUrl}/file`;
    const isLoading = ref(false);
    const userFilesUpload = ref<Array<FileMetaData>>([]);
    const userFilesData = ref<Array<FileMetaData>>([]);
    // metadata
    const maxItemsPerPage = ref<number>(10);
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(0);
    const totalFiles = ref<number>(0);
    const totalItems = ref<number>(0);

    const hasNext = computed(() => currentPage.value < totalPages.value);

    const uploadFiles = async (
        files: FileList | File[],
    ): Promise<TransfertUploadResponse> => {
        try {
            isLoading.value = true;
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

            const response = await authenticatedFetch<TransfertUploadResponse>(
                `${apiUrl}/upload`,
                {
                    method: "POST",
                    body: formData,
                },
            );

            return response;
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchUserFiles = async () => {
        if (isLoading.value) {
            return;
        }
        try {
            isLoading.value = true;
            const response = await authenticatedFetch<UserFilesGetResponse>(
                `${apiUrl}/all`,
                {
                    method: "GET",
                    query: {
                        page: currentPage.value,
                    },
                },
            );

            maxItemsPerPage.value = response.limit;
            totalItems.value = response.totalItems;
            totalFiles.value = response.totalFiles;
            totalPages.value = response.totalPages;
            userFilesData.value = response.data;
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };
    
    const deleteFile = async (id: number): Promise<TransfertDeleteResponse> => {
        if(isLoading.value) {
            return {status: '400', data: "Please try again later."};
        }
        try {
            isLoading.value = true;
            const response = await authenticatedFetch<TransfertDeleteResponse>(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });
            return response;
        } catch (error) {
            throw error
        } finally {
            isLoading.value = false
        }

    }

    const downloadFile = async (id: number, originalName: string) => {
        try {
            isLoading.value = true;

            const blob = await authenticatedFetch<Blob>(
                `${apiUrl}/download/${id}`,
                {
                    method: "GET",
                    responseType: "blob",
                },
            );

            const fileUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = originalName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const resetData = () => {
        userFilesData.value = [];
        currentPage.value = 1;
        totalPages.value = 0;
        totalFiles.value = 0;
        totalItems.value = 0;
        maxItemsPerPage.value = 10;
    };

    const resetUserFiles = () => {
        userFilesUpload.value = [];
        resetData();
    };

    return {
        isLoading: readonly(isLoading),
        userFilesUpload: readonly(userFilesUpload),
        userFilesData,
        maxItemsPerPage: readonly(maxItemsPerPage),
        currentPage,
        totalPages: readonly(totalPages),
        totalFiles: readonly(totalFiles),
        totalItems: readonly(totalItems),
        hasNext: readonly(hasNext),
        uploadFiles,
        fetchUserFiles,
        resetUserFiles,
        resetData,
        deleteFile,
        downloadFile,
    };
});
