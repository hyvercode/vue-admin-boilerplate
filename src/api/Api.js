import axios from "axios";
import authHeader from "@/api/auth-header";
import AuthService from "@/services/auth.service";

class Api {
    doPost(url, params) {
        return axios({
            method: 'POST',
            url: url,
            headers: authHeader(),
            data: params
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }

    doGet(url, params) {
        return axios.get(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }

    doPut(url, params) {
        return axios.put(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }

    doDelete(url, params) {
        return axios.delete(url, {
            params,
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }

    doGetBlob(url, params) {
        return axios.get(url, {
            params,
            responseType: 'arraybuffer',
            headers: authHeader()
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }

    doPostMultipart(url, params) {
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
            if (error.response.data.code === 403) {
                AuthService.refreshToken();
            }
            return error.response.data;
        });
    }
}

export default new Api();