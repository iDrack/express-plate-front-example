<script setup lang='ts'>
import type { TableColumn } from '@nuxt/ui';
import { getPaginationRowModel } from '@tanstack/vue-table';
import { useTransfertStore } from '~/stores/transfert.store';
import type { FileMetaData } from '~/stores/transfert.type';

const UButton = resolveComponent('UButton');
const transfertStore = useTransfertStore();
const toast = useToast();
const handleError = useHandleError();

const route = useRoute();
const router = useRouter();

const table = useTemplateRef('table')

const paginationPage = computed({
    get: () => currentPage.value,
    set: async (page: number) => {
        if (page === currentPage.value) return

        await router.replace({
            query: {
                ...route.query,
                page: String(page)
            }
        })
    }
})

const {
    userFilesData,
    maxItemsPerPage,
    currentPage,
    totalFiles,
    isLoading,
} = storeToRefs(transfertStore)

const deleteFile = async (id: number) => {
    try {
        const response = await transfertStore.deleteFile(id);
        if (response.status === '400') {
            toast.add({ title: 'Please wait.', description: response.data, color: 'info', icon: 'i-lucide-clock' });
            return;
        }
        toast.add({ title: 'File deleted.', description: response.data, color: 'success', icon: 'i-lucide-check' });
        const shouldGoToPreviousPage = userFilesData.value.length === 1 && currentPage.value > 1

        if (shouldGoToPreviousPage) {
            await router.replace({
                query: {
                    ...route.query,
                    page: String(currentPage.value - 1)
                }
            });
            return
        }
        await transfertStore.fetchUserFiles();
    } catch (error) {
        handleError(error, toast)
    }
}

const downloadFile = async (id: number, originalName: string) => {
    try {
        await transfertStore.downloadFile(id, originalName)
    } catch (error) {
        handleError(error, toast)
    }
}

const getHumanReadableSize = (size: number) => {
    if (!Number.isFinite(size) || size < 0) return '0 B'
    if (size === 0) return '0 B'

    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const factor = 1024
    const index = Math.min(
        Math.floor(Math.log(size) / Math.log(factor)),
        units.length - 1
    )

    const value = size / Math.pow(factor, index)
    return `${value.toFixed(0)} ${units[index]}`
}

const getFileCategory = (mimeType?: string) => {
    if (!mimeType) return 'autre'

    const normalized = mimeType.toLowerCase()
    const majorType = normalized.split('/')[0]

    if (majorType === 'application') {
        if (normalized.includes('pdf')) {
            return 'pdf'
        }
        if (normalized === 'application/rtf') {
            return 'text document'
        }
        if (normalized.includes('excel') || normalized.includes('csv')) {
            return 'spreadsheet'
        }
        if (normalized.includes('powerpoint')) {
            return 'presentation'
        }
        if (normalized === 'application/sql') {
            return 'database'
        }
        if (normalized === 'application/vnd.android.package-archive') {
            return 'apk'
        }
        if (normalized === 'application/vnd.appimage') {
            return 'application'
        }
        if (normalized === 'application/vnd.efi.img') {
            return 'image disk'
        }
        if (normalized === 'application/vnd.efi.iso') {
            return 'iso file'
        }
        if (normalized.includes('flatpak')) {
            return 'flatpak'
        }
        if (
            normalized === 'application/json' ||
            normalized === 'application/xml' ||
            normalized === 'application/javascript' ||
            normalized === 'application/toml'
        ) {
            return 'text'
        }

        return 'misc'
    }

    return majorType;
}

const columns: TableColumn<FileMetaData>[] = [
    {
        accessorKey: 'originalName',
        header: 'Name',
        cell: ({ row }) => `${row.getValue('originalName')}`
    },
    {
        accessorKey: 'mimeType',
        header: 'Type',
        cell: ({ row }) => getFileCategory(row.original.mimeType),
        meta: {
            class: {
                th: 'text-right',
                td: 'text-right',
            }
        }
    },
    {
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => getHumanReadableSize(Number(row.getValue('size'))),
        meta: {
            class: {
                th: 'text-right',
                td: 'text-right',
            }
        }
    },
    {
        id: 'actions',
        header: '',
        meta: {
            class: {
                th: 'w-1 whitespace-nowrap',
                td: 'w-1 whitespace-nowrap'
            }
        },
        cell: ({ row }) =>
            h('div', { class: 'inline-flex items-center justify-end gap-1' }, [
                h(UButton, {
                    icon: 'i-lucide-download',
                    color: 'neutral',
                    variant: 'ghost',
                    onClick: () => downloadFile(row.original.id, row.original.originalName)
                }),
                h(UButton, {
                    icon: 'i-lucide-trash',
                    color: 'error',
                    variant: 'ghost',
                    onClick: () => deleteFile(row.original.id)
                })
            ])
    },
]

</script>

<template>
    <div class="h-full flex flex-col pb-4">
        <div v-if="totalFiles > 0">
            <div class="border-default border-x border-y rounded-md md:min-h-[765px] flex flex-col">
                <div class="flex-1">
                    <UTable :loading="isLoading" loading-color="primary" loading-animation="carousel"
                        :data="userFilesData" :columns="columns" />
                </div>

                <div class="flex justify-end border-t border-default py-4 px-4">
                    <UPagination v-model:page="paginationPage" :total="totalFiles" :items-per-page="maxItemsPerPage" />

                </div>
            </div>
        </div>
        <div v-else class="h-full flex flex-col">
            <TransfertBrowseEmpty />
        </div>
    </div>
</template>

<style scoped></style>