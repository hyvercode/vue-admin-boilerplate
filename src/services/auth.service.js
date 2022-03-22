import Host from "@/api/host";
import router from "../router/index";
import Api from "../api/Api";
import VueCookies from "vue-cookies";
import Pages from "../helpers/Pages";

class AuthService {
    login(user) {
        return Api.doPostOut(Host.API_V1 + "/auth/login", user).then((response) => {
            if (response.code === 200 && response.data.access_token) {
                VueCookies.set(
                    "__PMS__SSESSIONID__",
                    JSON.stringify(response.data),
                    Math.floor(response.data.expires_in / 1440) + "d",
                    "/",
                    "",
                    true,
                    "Strict"
                );
            }
            return response;
        });
    }

    logout() {
        VueCookies.remove("__PMS__SSESSIONID__");
        location.reload();
        return Api.doPostOut(Host.API_V1 + "/auth/logout", "").then(
            () => {
                VueCookies.remove("__PMS__SSESSIONID__");
                router.push(Pages.LOGIN);
                location.reload();
            },
            () => {
                VueCookies.remove("__PMS__SSESSIONID__");
                router.push(Pages.LOGIN);
                location.reload();
            }
        );
    }

    refreshToken() {
        return Api.doPost(Host.API_V1 + "/auth/refresh", "").then(
            (response) => {
                if (response.code === 200 && response.data.access_token) {
                    VueCookies.set(
                        "__PMS__SSESSIONID__",
                        JSON.stringify(response.data),
                        Math.floor(response.data.expires_in / 1440) + "d",
                        "/",
                        "",
                        true,
                        "Strict"
                    );
                }
                return response.data;
            },
            () => {
                this.logout().then(() => {
                    router.push(Pages.LOGIN);
                });
            }
        );
    }

    postVerifikaiOtp(username) {
        return Api.doGet(Host.API_V1 + "/otp/" + username);
    }

    RefreshOtp(username) {
        return Api.doPost(Host.API_V1 + "/password/generate", {
            username: username,
        });
    }

    postverified(params) {
        return Api.doPost(Host.API_V1 + "/otp/verified", params);
    }

    resetPassword(params) {
        return Api.doPost(Host.API_V1 + "/otp/changePassword", params);
    }
}

export default new AuthService();
