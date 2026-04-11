export interface FileMetaData {
    id: number;
    originalName: string;
    storedAs: string;
    size: number;
    mimeType: string;
    userId: number;
}

export interface TransfertUploadResponse {
    status: string;
    data: {
        files: Record<string, FileMetaData>;
    };
}

export interface UserFilesGetResponse {
    data: FileMetaData[];
    page: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    totalFiles: number;
    prevPage: number | null;
    nextPage: number | null;
}

export interface TransfertDeleteResponse {
    status: string;
    data: string;
}
