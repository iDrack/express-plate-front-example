import type {
    LoginResponse,
    MessageResponse,
    UserProfile,
    UserProfileResponse,
} from "./auth.type";
import { useAuthenticatedFetch } from "~/composables/authenticatedFetch";

export const useAuthStore = defineStore("auth", () => {
    const authenticatedFetch = useAuthenticatedFetch();
    const apiUrl = `${useRuntimeConfig().public.apiUrl}/users`;
    const isLoading = ref(false);
    const authToken = ref("");
    const profile = ref();

    /**
     * Create user account and log in, storing it's authToken.
     * @param name
     * @param email
     * @param password
     */
    const register = async (name: string, email: string, password: string) => {
        try {
            isLoading.value = true;
            if (authToken.value !== "") {
                await logout();
            }
            const { data, error } = await useFetch<LoginResponse>(
                `${apiUrl}/register`,
                {
                    method: "POST",
                    body: {
                        name: name.trim(),
                        email: email.toLowerCase().trim(),
                        password: password.trim(),
                    },
                },
            );
            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }
            if (!data.value?.data) {
                throw createError({
                    statusCode: 500,
                    statusMessage: "Error while creating account.",
                });
            }
            authToken.value = data.value.data.accessToken;
            await getProfile();
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Log the user and fetch it's auth token.
     * @param name
     * @param email
     * @param password
     */
    const login = async (
        name: string | null,
        email: string | null,
        password: string,
    ) => {
        if (!name && !email) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    "You need to specify an e-mai or a username to log in.",
            });
        }
        try {
            isLoading.value = true;

            const { data, error } = await useFetch<LoginResponse>(
                `${apiUrl}/login`,
                {
                    method: "POST",
                    body: {
                        name: name?.trim(),
                        email: email?.toLowerCase().trim(),
                        password: password.trim(),
                    },
                },
            );

            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }

            if (!data.value?.data) {
                throw createError({
                    statusCode: 500,
                    statusMessage: "No data available.",
                });
            }
            authToken.value = data.value.data.accessToken;
            await getProfile();
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Disconnect the user and delete the auth token and the refresh token.
     */
    const logout = async () => {
        try {
            await useFetch(`${apiUrl}/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken.value}`,
                },
                credentials: "include",
            });
        } catch (error) {
            throw error;
        } finally {
            authToken.value = "";
            profile.value = null;
            navigateTo('/')
            useToast().add({ title: 'Disconnected', description: 'You have been disconnected.', color: 'info', icon: 'i-lucide-icon' })
        }
    };

    /**
     * Request a new auth token via the refresh token stored in the cookies.
     * @returns True if the auth token has been refresh successfully.
     */
    const refreshAuthToken = async (): Promise<Boolean> => {
        try {
            isLoading.value = true;
            const { data, error } = await useFetch<LoginResponse>(
                `${apiUrl}/refresh`,
                {
                    method: "POST",
                    credentials: "include",
                },
            );
            if (error.value) {
                if (error.value?.statusCode === 401) {
                    logout();
                }
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }
            if (data.value?.data) {
                authToken.value = data.value.data.accessToken;
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Fetch the user profile.
     * @returns User profile.
     */
    const getProfile = async () => {
        try {
            isLoading.value = true;
            const { data } = await authenticatedFetch<UserProfileResponse>(
                `${apiUrl}/profile`,
                {
                    method: "GET",
                },
            );

            if (data.value?.data) {
                profile.value = data.value.data;
                return data.value.data;
            } else {
                throw createError({
                    statusCode: 400,
                    statusMessage: "Unable to parse data",
                });
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Update user information and refresh the auth token.
     * @param newName new username.
     * @param newEmail new email address.
     */
    const updateProfile = async (
        newName: string | null,
        newEmail: string | null,
    ) => {
        try {
            isLoading.value = true;
            const { data, error } = await authenticatedFetch<LoginResponse>(
                `${apiUrl}`,
                {
                    method: "PUT",
                    body: {
                        email: newEmail?.toLowerCase().trim(),
                        name: newName?.trim(),
                    },
                },
            );
            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }
            if (data.value?.data) {
                authToken.value = data.value.data.accessToken;
                await getProfile();
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Update user password.
     * @param oldPassword old password.
     * @param newPassword new password.
     */
    const updatePassword = async (oldPassword: string, newPassword: string) => {
        try {
            isLoading.value = true;
            const { data, error } = await authenticatedFetch<LoginResponse>(
                `${apiUrl}/password-change`,
                {
                    method: "PUT",
                    body: {
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                    },
                },
            );
            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }
            if (data.value?.data) {
                authToken.value = data.value.data.accessToken;
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Request the API for a password reset.
     * @param email User email for confirming identity.
     */
    const makePasswordResetRequest = async (email: string) => {
        try {
            isLoading.value = true;
            const { data, error } = await useFetch<MessageResponse>(
                `${apiUrl}/forgot-password`,
                {
                    method: "POST",
                    body: {
                        email: email.toLowerCase().trim(),
                    },
                },
            );

            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }
            if (data.value?.message) {
                return data.value.message;
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     *
     * @param token
     * @param password
     * @returns
     */
    const passwordReset = async (token: string, password: string) => {
        try {
            isLoading.value = true;
            const { data, error } = await useFetch<MessageResponse>(
                `${apiUrl}/password-reset`,
                {
                    method: "PUT",
                    body: {
                        token: token,
                        password: password.trim(),
                    },
                },
            );
            if (error.value) {
                throw createError({
                    statusCode: error.value.statusCode,
                    statusMessage:
                        error.value.data.message || error.value.statusMessage,
                });
            }

            if (data.value?.message) {
                return data.value.message;
            }
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        authToken: readonly(authToken),
        profile: readonly(profile),
        isLoading: readonly(isLoading),
        register,
        login,
        logout,
        refreshAuthToken,
        getProfile,
        updateProfile,
        updatePassword,
        makePasswordResetRequest,
        passwordReset,
    };
});
