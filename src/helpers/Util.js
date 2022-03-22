import VueJwtDecode from "vue-jwt-decode";
import VueCookies from "vue-cookies";
import CryptoJS from "crypto-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
            let separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        return rupiah;
    }

    /**
     * @param token
     * @returns {*}
     */
    jwtDecode(token) {
        return VueJwtDecode.decode(token);
    }

    /**
     * @param text
     * @returns {string}
     */
    encrypt(text) {
        return CryptoJS.AES.encrypt(
            text.toString(),
            this.jwtDecode(
                JSON.parse(JSON.stringify(VueCookies.get("__PMS__SSESSIONID__")))
                    .access_token
            ).login_id
        ).toString();
    }

    /**
     * @param text
     * @returns {string}
     */
    decrypt(text) {
        let bytes = CryptoJS.AES.decrypt(
            text.toString(),
            this.jwtDecode(
                JSON.parse(JSON.stringify(VueCookies.get("__PMS__SSESSIONID__")))
                    .access_token
            ).login_id
        );
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    /**
     * @param evt
     * @returns {boolean}
     */
    isNumber(evt) {
        evt = evt ? evt : window.event;
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
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
            {id: 1, desc: "Active"},
            {id: 0, desc: "Inactive"},
        ];
    }

    type() {
        return [
            {id: "freetext", desc: "Input Text"},
            {id: "photo", desc: "Photo"},
            {id: "video", desc: "Video"},
            {id: "text", desc: "Text"},
            {id: "checkbox", desc: "Checkbox"},
            {id: "upload", desc: "Upload"}
        ];
    }

    group() {
        return [
            {id: "parent", desc: "Parent"},
            {id: "child", desc: "Child"},
        ];
    }

    /**
     *
     * @param str
     * @param start
     * @param end
     * @returns {string|string|*|string}
     */
    sunStr(str, start, end) {
        return str.substr(start, end);
    }

    onPrintPdf(title, orientation, format, columns, rows) {
        const pdf = new jsPDF({
            orientation: orientation, format: format, precision: 2
        });
        pdf.setFontSize(10);
        pdf.text(title + '_' + new Date().toISOString().slice(0, 10), 15, 10);
        pdf.setFontSize(5);
        const column = [];
        column.push('No');
        const data = [];
        for (let index in columns) {
            column.push(columns[index].label);
        }
        for (let key in rows) {
            let record = [];
            record.push(parseInt(key) + 1);
            for (let index in columns) {
                record.push(this.collect(rows[key], columns[index].field));
            }
            data.push(record);
        }
        const head = [column];
        autoTable(pdf, {
            head: head, body: data
        });

        pdf.save(title + '_' + new Date() + '.pdf')
    }

    dig(obj, selector) {
        let result = obj;
        const splitter = selector.split('.');

        for (let i = 0; i < splitter.length; i++) {
            if (result == undefined) return undefined;

            result = result[splitter[i]];
        }

        return result;
    }

    collect(obj, field) {
        if (typeof (field) === 'function') return field(obj); else if (typeof (field) === 'string') return this.dig(obj, field); else return undefined;
    }

    onExportExcel(title, columns, rows) {
        const mimeType = 'data:application/vnd.ms-excel';
        const html = this.renderTable(rows, columns).replace(/ /g, '%20');

        // eslint-disable-next-line eqeqeq
        const documentPrefix = title !== '' ? title.replace(/ /g, '-') : 'Sheet';
        const d = new Date();

        const dummy = document.createElement('a');
        dummy.href = mimeType + ', ' + html;
        dummy.download = documentPrefix + '_' + d.getTime() + '.xls';
        document.body.appendChild(dummy);
        dummy.click();
    }

    onExportCsv(title, columns, rows) {
        const mimeType = 'data:application/vnd.ms-excel';
        const html = this.renderTable(rows, columns).replace(/ /g, '%20');

        // eslint-disable-next-line eqeqeq
        const documentPrefix = title !== '' ? title.replace(/ /g, '-') : 'Sheet';
        const d = new Date();

        const dummy = document.createElement('a');
        dummy.href = mimeType + ', ' + html;
        dummy.download = documentPrefix + '_' + d.getTime() + '.csv';
        document.body.appendChild(dummy);
        dummy.click();
    }

    renderTable(rows, columns) {
        let table = '<table><thead>';

        table += '<tr>';
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            table += '<th>';
            table += column.label;
            table += '</th>';
        }
        table += '</tr>';

        table += '</thead><tbody>';

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            table += '<tr>';
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                table += '<td>';
                table += this.collect(row, column.field);
                table += '</td>';
            }
            table += '</tr>';
        }

        table += '</tbody></table>';

        return table;
    }

    calculated() {
        return [
            {id: 1, desc: "CALCULATED"},
            {id: 0, desc: "NON CALCULATED"},
        ];
    }
}

export default new Utils();
