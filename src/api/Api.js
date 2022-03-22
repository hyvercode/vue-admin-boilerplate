import axios from "axios";
import authHeader from "./header";
import AuthService from "../services/auth.service";

class Api {
    async doPost(url, params) {
        return axios({
            method: 'POST',
            url: url,
            headers: authHeader(),
            data: params
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }

            return error.response.data;
        });
    }

    async doGet(url, params) {
        return axios.get(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }

            return error.response.data;
        });
    }

    async doPut(url, params) {
        return axios.put(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }
            return error.response.data;
        });
    }

    async doDelete(url, params) {
        return axios.delete(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }

            return error.response.data;
        });
    }

    async doGetBlob(url, params) {
        return axios.get(url, {
            params,
            responseType: 'arraybuffer',
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }

            return error.response.data;
        });
    }

    async doPostMultipart(url, params) {
        let header = authHeader();
        header['Content-Type'] = 'multipart/form-data'
        return axios({
            method: 'POST',
            url: url,
            headers: header,
            data: params
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 401) {
                AuthService.refreshToken();
            }

            if (error.response.data.code === 403) {
                AuthService.logout();
            }

            return error.response.data;
        });
    }

    async doPostOut(url, params) {
        return axios({
            method: 'POST',
            url: url,
            headers: authHeader(),
            data: params
        }).then(response => {
            return response.data;
        }).catch(error => {
            return error.response.data;
        });
    }
}

export default new Api();