import type {
    FileMetaData,
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
    const maxItemsPerPage = 10;
    const currentPage = ref<number>(0);
    const totalPages = ref<number>(0);
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

    const fetchUserFiles = async (page: number) => {
        if (isLoading.value) {
            return;
        }
        try {
            if (page > currentPage.value) {
                isLoading.value = true;
                const response = await authenticatedFetch<UserFilesGetResponse>(
                    `${apiUrl}/all`,
                    {
                        method: "GET",
                        query: {
                            page: page,
                        },
                    },
                );
                console.log(response);

                totalItems.value = response.totalItems;
                totalPages.value = response.totalPages;
                if (page === 1) {
                    userFilesData.value = response.data;
                } else {
                    userFilesData.value = [
                        ...userFilesData.value,
                        ...response.data,
                    ];
                }
                console.log(userFilesData.value.length);
                console.log(userFilesData.value);
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const loadMore = async () => {
        try {
            if (hasNext.value) await fetchUserFiles(currentPage.value + 1);
        } catch (error) {
            throw error;
        }
    };

    const loadPage = async (page: number) => {
        try {
            if (page > currentPage.value) {
                const target = page - currentPage.value;
            }
        } catch (error) {
            throw error;
        }
    };

    const getPage = async (page: number) => {
        try {
            if (hasNext) {
                if (page > currentPage.value) {
                    await loadPage(page);
                }
                const offset = (page - 1) * maxItemsPerPage;
                const limit =
                    page === totalPages.value
                        ? userFilesData.value.length
                        : offset + maxItemsPerPage;
                return userFilesData.value.slice(offset, limit);
            }
        } catch (error) {
            throw error;
        }
    };

    const resetData = () => {
        userFilesData.value = [];
        currentPage.value = 0;
        totalPages.value = 0;
    };

    const resetUserFiles = () => {
        userFilesUpload.value = [];
        resetData();
    };

    return {
        isLoading: readonly(isLoading),
        userFilesUpload: readonly(userFilesUpload),
        userFilesData: readonly(userFilesData),
        currentPage: readonly(currentPage),
        totalPages: readonly(totalPages),
        totalItems: readonly(totalItems),
        hasNext: readonly(hasNext),
        uploadFiles,
        fetchUserFiles,
        resetUserFiles,
        resetData,
        loadMore,
        loadPage,
        getPage,
    };
});
