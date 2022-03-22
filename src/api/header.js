import VueCookies from "vue-cookies";

export default function authHeader() {
    let auth = JSON.parse(JSON.stringify(VueCookies.get('__PMS__SSESSIONID__')));
    if (auth) {
        return {
            'Authorization': 'Bearer ' + auth.access_token,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}