import {useSWR} from "swr-vue";
import { navigateTo, useRoute, useRouter } from "nuxt/app";
import {useAxios} from "./axios";
import { watch } from "vue";

export function useAuth ({ middleware, redirectIfAuthenticated } = {}) {
    const route = useRoute();
    const router = useRouter();
    const axios = useAxios();
    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/user", () =>
        axios
            .get("/api/user")
            .then((res) => res.data)
            .catch((error) => {
                if (error.response.status !== 409) throw error;

                router.push("/verify-email");
            })
    );

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const register = async ({ errors, ...props }) => {
        await csrf();

        errors.value = [];

        axios
            .post("/register", props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                errors.value = error.response.data.errors;
            });
    };

    const login = async ({ errors, status, ...props }) => {
        await csrf();

        errors.value = [];
        status.value = null;

        axios
            .post("/login", props)
            .then(() => {
                mutate();
                error.value = null;
            })
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                errors.value = error.response.data.errors;
            });
    };

    const forgotPassword = async ({ errors, status, email }) => {
        await csrf();

        errors.value = [];
        status.value = null;

        axios
            .post("/forgot-password", { email: email.value })
            .then((response) => {
                status.value = response.data.status;
                email.value = "";
            })
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                errors.value = error.response.data.errors;
            });
    };

    const resetPassword = async ({ errors, status, ...props }) => {
        await csrf();

        errors.value = [];
        status.value = null;

        axios
            .post("/reset-password", { token: route.params.token, ...props })
            .then((response) => navigateTo("/login?reset=" + btoa(response.data.status)))
            .catch((error) => {
                if (error.response.status !== 422) throw error;

                errors.value = error.response.data.errors;
            });
    };

    const resendEmailVerification = ({ status }) => {
        axios.post("/email/verification-notification").then((response) => (status.value = response.data.status));
    };

    const logout = async () => {
        await csrf()
        if (!error.value) {
            await axios.post("/logout").then(() => mutate());
        }

        window.location.pathname = "/login";
    };

    watch([user, error], () => {
        if (middleware === "guest" && redirectIfAuthenticated && user.value) {
            router.push(redirectIfAuthenticated);
        }

        if (window.location.pathname === "/verify-email" && user.value?.email_verified_at) {
            router.push(redirectIfAuthenticated);
        }

        if (middleware === "auth" && error.value) {
            logout().then(data => data);
        }
    });

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
}
