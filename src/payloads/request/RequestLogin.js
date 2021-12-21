export default class RequestLogin {
    username;
    password;
    remember_me = false;
    coordinate = localStorage.getItem('__coordinate');
    fcm_token = sessionStorage.getItem('_fcmid_');
}