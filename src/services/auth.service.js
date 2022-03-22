import axios from "axios";
import API_URL from "@/api";
import authHeader from "@/api/auth-header";

class AuthService {
    login(user) {
        return axios
            .post(API_URL.v1 + '/login', {
                username: user.username,
                password: user.password,
                fcm_id: localStorage.getItem('_fcmid_')
            })
            .then(response => {
                if (response.data.data.access_token) {
                    localStorage.setItem('ADMGM_SESSION', JSON.stringify(response.data.data));
                }
                return response.data;
            });
    }

    logout() {
        axios.post(API_URL.v1 + '/logout', {headers: authHeader()}).then(() => {
            localStorage.removeItem('ADMGM_SESSION');
        }, () => {
            localStorage.removeItem('ADMGM_SESSION');
        });
    }

    refreshToken() {
        axios.post(API_URL.v1 + '/refresh', {headers: authHeader()})
            .then(response => {
                if (response.data.data.access_token) {
                    localStorage.setItem('ADMGM_SESSION', JSON.stringify(response.data.data));
                }
                return response.data;
            }, () => {
                this.logout();
            });
    }
}

export default new AuthService();