export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('ADMGM_SESSION'));
    if (user && user.access_token) {
        return { 'Authorization': 'Bearer ' + user.access_token,
                'X_USER_ID':user.user.id,
                'Content-Type': 'application/json'};
    } else {
        return {};
    }
}