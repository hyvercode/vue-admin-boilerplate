export default class RequestLogin {
    constructor(username,
                password,
                remember_me = false,
                coordinate = localStorage.getItem("__coordinate"),
                fcm_token = sessionStorage.getItem("_fcmid_")) {
        this.username = username;
        this.password = password;
        this.remember_me = remember_me;
        this.coordinate = coordinate;
        this.fcm_token = fcm_token;
    }

}
