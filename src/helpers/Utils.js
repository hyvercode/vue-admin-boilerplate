import VueJwtDecode from "vue-jwt-decode";
import VueCookies from "vue-cookies";
import CryptoJS from 'crypto-js';

class Utils {
    /**
     * @param str
     * @param index
     * @param chr
     * @returns {string|*}
     */
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }

    /**
     * @param json
     * @returns {any}
     */
    toJSON(json) {
        if (json) {
            let record = JSON.parse(json);
            return JSON.parse(record);
        }
    }

    /**
     * @param nominal
     * @returns {string}
     */
    currencyRp(nominal) {
        let number_string = nominal.toString();
        let sisa = number_string.length % 3;
        let rupiah = number_string.substr(0, sisa);
        let ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        return rupiah;
    }

    /**
     * @param token
     * @returns {*}
     */
    jwtDecode(token) {
        return VueJwtDecode.decode(token)
    }

    /**
     * @param text
     * @returns {string}
     */
    encrypt(text) {
        return CryptoJS.AES.encrypt(text.toString(), this.jwtDecode(JSON.parse(JSON.stringify(VueCookies.get('_PICKERSSESSIONID'))).access_token).login_id).toString();
    }

    /**
     * @param text
     * @returns {string}
     */
    decrypt(text) {
        let bytes = CryptoJS.AES.decrypt(text.toString(), this.jwtDecode(JSON.parse(JSON.stringify(VueCookies.get('_PICKERSSESSIONID'))).access_token).login_id);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    /**
     * @param evt
     * @returns {boolean}
     */
    isNumber(evt) {
        evt = evt ? evt : window.event;
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46
        ) {
            evt.preventDefault();
        } else {
            return true;
        }
    }

    /**
     * @param e
     * @returns {string}
     */
    resizeImage(e) {
        let img = new Image();
        img.src = e;
        img.id = Math.random().toString(20).substr(2, 6);
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let MAX_WIDTH = 500;
        let MAX_HEIGHT = 450;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx2 = canvas.getContext("2d");
        ctx2.drawImage(img, 0, 0, width, height);

        return canvas.toDataURL("image/png");
    }

    status() {
        return [
            {id: 'ACTIVE', desc: 'Active'},
            {id: 'NON_ACTIVE', desc: 'Non Active'}
        ]
    }
}

export default new Utils();