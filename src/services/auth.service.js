import Host from '@/api/host'
import router from "../router/index";
import Api from "../api/index";
import VueCookies from "vue-cookies";
import Pages from "../helpers/Pages";

class AuthService {
    login(user) {
        return Api.doPost(Host.API_V1 + '/auth/partner/login', user).then(response => {
            if (response.code === 200 && response.data.access_token) {
                VueCookies.set('_PICKERSSESSIONID', JSON.stringify(response.data), Math.floor(response.data.expires_in / 1440) + 'd', '/', '', true, 'Strict');
            }
            return response;
        });
    }

    logout() {
        VueCookies.remove('_PICKERSSESSIONID');
        location.reload();
        return Api.doPost(Host.API_V1 + '/auth/logout', '').then(() => {
            VueCookies.remove('_PICKERSSESSIONID');
            router.push(Pages.LOGIN);
            location.reload();
        }, () => {
            VueCookies.remove('_PICKERSSESSIONID');
            router.push(Pages.LOGIN);
            location.reload();
        });
    }

    refreshToken() {
        return Api.doPost(Host.API_V1 + '/auth/refresh', '').then(response => {
            if (response.code === 200 && response.data.access_token) {
                VueCookies.set('_PICKERSSESSIONID', JSON.stringify(response.data), Math.floor(response.data.expires_in / 1440) + 'd', '/','', true, 'Strict');
            }
            return response.data;
        }, () => {
            this.logout().then(() => {
                router.push(Pages.LOGIN);
            });
        });
    }
}

export default new AuthService();