<template>
  <div class="card material-table" ref="table">
    <div v-if="titleShow" class="table-header">
      <span class="table-title">{{ title }}</span>
    </div>
    <div class="table-header">
      <span v-if="filterYears">
        <div class="input-group">
          <label style="margin-right: 10px;">Year :</label>
            <datepicker
                v-model="years"
                placeholder="Year"
                :initialView="'year'"
                :minimumView="'year'"
                :maximumView="'year'"
                :bootstrap-styling="true"
                :format="'yyyy'"
                @selected="onChangeYear"
            >
            </datepicker>
      </div>
      </span>
      <span v-if="filterDate">
        <div class="input-group">
          <span class="input-group-text">Date</span>
          <input type="date" v-model="dateFrom" class="form-control form-control-sm">
          <span class="input-group-text">to</span>
          <input type="date" v-model="dateTo" v-on:change="onChangeDate" class="form-control form-control-sm">
      </div>
      </span>
      <span v-if="filter">
        <div class="input-group">
          <span class="input-group-text"><i class="material-icons">filter_list</i></span>
          <select class="form-select form-select-sm" v-model="filterBy" v-on:change="onChangeFilter"
                  aria-label="Filter">
            <option selected value="All">All</option>
            <option v-for="item in filterRecord" :value="item.id" :key="item.id">{{ getDesc(item) }}</option>
          </select>
        </div>
      </span>
      <span>
        <div class="input-group" v-if="searching">
          <input id="search-input-container" class="form-control form-control-sm" type="search"
                 v-model="searchInput" placeholder="Input search parameter" @keyup.enter="onEnterSearch">
            <span class="input-group-text" id="addon-wrapping" @click="onChangeSearch"><i
                class="material-icons">search</i></span>
        </div>
      </span>
      <div class="actions">
        <a v-if="refreshable"
           href="javascript:undefined"
           class="waves-effect btn-flat nopadding mt-1"
           @click="onRefresh"
        >
          <i class="material-icons">refresh</i>
        </a>
        <a v-if="printable"
           href="javascript:undefined"
           class="waves-effect btn-flat nopadding mt-1"
           @click="onPrint"
        >
          <i class="material-icons">print</i>
        </a>
        <a v-if="exportable"
           href="javascript:undefined"
           class="waves-effect btn-flat nopadding mt-1"
           @click="onExportExcel"
        >
          <i class="material-icons">description</i>
        </a>
        <a v-if="crateButton"
           href="javascript:undefined"
           class="waves-effect btn btn-primary nopadding"
           @click="onCreate"
        >
          Create New
        </a>
      </div>
    </div>

    <table ref="table" v-if="columns">
      <thead>
      <tr>
        <th>No</th>
        <th v-for="(column, index) in columns"
            :key="index"
            :class="(sortable ? 'sorting ' : '')
							+ (sortColumn === index ?
								(sortType === 'desc' ? 'sorting-desc' : 'sorting-asc')
								: '')
							+ (column.numeric ? ' numeric' : '')"
            :style="{width: column.width ? column.width : 'auto',display:column.hidden?'none':''}"
            @click="sort(index)"
        >
          {{ column.label }}
        </th>
        <slot name="thead-tr"/>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in paginated"
          :key="index"
          :class="{ clickable : clickable }"
          @click="onRowClick(row)"
      >
        <td> {{
            currentPerPage * (currentPage - 1) +
            index +
            1
          }}
        </td>
        <td v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            :class="{ numeric : column.numeric }"
        >
          <div v-if="!column.html && !column.currency"
               :style="{width: column.width ? column.width : 'auto',display:column.hidden?'none':''}">
            {{ collect(row, column.field) }}
          </div>
          <div v-if="!column.html && column.currency" v-html="isCurrency(collect(row, column.field)) "
               :style="{width: column.width ? column.width : 'auto',display:column.hidden?'none':''}"/>
          <div v-if="column.html" v-html="collect(row, column.field)"
               :style="{width: column.width ? column.width : 'auto',display:column.hidden?'none':''}"/>
        </td>
        <slot name="tbody-tr" :row="row"/>
      </tr>

      <template v-if="rows.length === 0 && loadingAnimation === true">
        <tr v-for="n in (currentPerPage === -1 ? 10 : currentPerPage)"
            :key="n"
        >
          <td :colspan="columns.length">
            <tb-skeleton :height="15" theme="opacity" bg-color="#dcdbdc" shape="radius"/>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <div v-if="paginate" class="table-footer">
      <div :class="{'datatable-length': true, 'rtl': lang.__is_rtl}">
        <label>
          <span>{{ lang['rows_per_page'] }}:</span>
          <select class="browser-default" v-model="limit" @change="onChangeRowPage">
            <option v-for="(option, index) in rowsPerPage"
                    :key="index"
                    :value="option"
                    :selected="option === currentPerPage"
            >
              {{ option === -1 ? lang['10'] : option }}
            </option>
          </select>
        </label>
      </div>
      <div :class="{'datatable-info': true, 'rtl': lang.__is_rtl}">
				<span>
          {{ currentPage }}
				</span>
        <span>
					{{ lang['out_of_pages'] }}
				</span>
        <span>
					{{ lastPage }}
				</span>
      </div>
      <div>
        <ul class="pagination justify-content-center material-pagination">
          <li>
            <a href="javascript:undefined"
               class="waves-effect btn-flat"
               tabindex="0"
               @click.prevent="onPreviousPage"
            >
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li>
            <a href="javascript:undefined"
               class="waves-effect btn-flat"
               tabindex="0"
               @click.prevent="onNextPage"
            >
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import './styles.css';
import Fuse from 'fuse.js';
import locales from './index';
import {TbSkeleton} from 'tb-skeleton';
import Utils from "../../helpers/Utils";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    TbSkeleton,
    Datepicker
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    titleShow: {
      type: Boolean,
      required: false,
      default: true,
    },

    columns: {
      type: Array,
      required: true,
    },

    rows: {
      type: Array,
      required: true,
    },

    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },

    searching: {
      type: Boolean,
      required: false,
      default: true,
    },

    customButtons: {
      type: Array,
      required: false,
      default: () => [],
    },

    rowsPerPage: {
      type: Array,
      required: false,
      default: () => [5, 10, 50, 100, 500, 1000],
    },

    defaultPerPage: {
      type: Number,
      required: false,
      default: 10,
    },

    currentPage: {
      type: Number,
      required: false,
      default: 1,
    },

    lastPage: {
      type: Number,
      required: false,
      default: 1,
    },

    currentPerPage: {
      type: Number,
      required: false,
      default: 10,
    },

    prevPageUrl: {
      type: String,
      required: false,
      default: null,
    },

    nextPageUrl: {
      type: String,
      required: false,
      default: null,
    },

    sortable: {
      type: Boolean,
      required: false,
      default: true,
    },

    searchable: {
      type: Boolean,
      required: false,
      default: true,
    },

    exactSearch: {
      type: Boolean,
      required: false,
      default: false,
    },

    filter: {
      type: Boolean,
      required: false,
      default: false,
    },

    filterRecord: {
      type: Array,
      required: false,
      default: () => [{'id': 'id', "desc": "ID"}, {'id': 'status', "desc": "Status"}],
    },

    serverSearch: {
      type: Boolean,
      required: false,
      default: false,
    },

    serverSearchFunc: {
      type: Function,
      required: false,
      default: () => {
      },
    },

    paginate: {
      type: Boolean,
      required: false,
      default: true,
    },

    exportable: {
      type: Boolean,
      required: false,
      default: false,
    },

    printable: {
      type: Boolean,
      required: false,
      default: false,
    },

    locale: {
      type: String,
      required: false,
      default: 'en',
    },

    initSortCol: {
      type: Number,
      required: false,
      default: -1,
    },

    loadingAnimation: {
      type: Boolean,
      required: false,
      default: false,
    },

    crateButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    filterDate: {
      type: Boolean,
      required: false,
      default: false
    },

    refreshable: {
      type: Boolean,
      required: false,
      default: false
    },

    filterYears: {
      type: Boolean,
      required: false,
      default: false
    },

    pdfOrientation: {
      type: String,
      required: false,
      default: 'landscape',
    },

    pdfFormat: {
      type: String,
      required: false,
      default: 'legal',
    },

  },
  data: () => ({
    dateFrom: '',
    dateTo: '',
    filterBy: 'id',
    filterParam: '',
    limit: 10,
    sortColumn: -1,
    sortType: 'asc',
    searchInput: '',
    years: ''
  }),

  methods: {
    getDesc(obj) {
      const result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
      return result[1][1];
    },

    onCreate() {
      this.$emit("onCreate")
    },

    onRefresh() {
      this.$emit("onRefresh", [this.filterBy, this.limit, this.currentPage])
    },

    onChangeFilter() {
      this.$emit("onChangeFilter", [this.filterBy, this.limit, this.currentPage])
    },

    onChangeYear() {
      this.$emit("onChangeYear", this.years)
    },

    onChangeDate() {
      if (this.dateFrom < this.dateTo) {
        this.$emit("onChangeDate", [this.dateFrom, this.dateTo])
      } else {
        alert('Invalid date !')
      }
    },

    onChangeSearch() {
      if (this.dateFrom < this.dateTo) {
        this.$emit("onChangeSearch", [this.searchInput, this.limit, this.currentPage])
      } else {
        alert('Invalid date !')
      }
    },

    onEnterSearch() {
      if (this.dateFrom < this.dateTo) {
        this.$emit("onEnterSearch", [this.searchInput, this.limit, this.currentPage])
      } else {
        alert('Invalid date !')
      }
    },

    onNextPage() {
      if (this.nextPageUrl) {
        ++this.currentPage;
        this.$emit("onNextPage", [this.limit, this.currentPage])
      }
    },

    onPreviousPage() {
      if (this.prevPageUrl) {
        this.currentPage--;
        this.$emit("onPreviousPage", [this.limit, this.currentPage])
      }
    },

    onChangeRowPage(e) {
      this.currentPerPage = parseInt(e.target.value);
      this.$emit("onChangeRowPage", [this.limit, this.currentPage])
    },

    isCurrency(value) {
      return Utils.currencyRp(value);
    },

    sort(index) {
      if (!this.sortable)
        return;
      if (this.sortColumn === index) {
        this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortType = 'asc';
        this.sortColumn = index;
      }
    },

    onRowClick(row) {
      if (!this.clickable) {
        return;
      }

      if (getSelection().toString()) {
        // Return if some text is selected instead of firing the row-click event.
        return;
      }

      this.$emit('onRowClick', row);
    },

    onExportExcel() {
      const mimeType = 'data:application/vnd.ms-excel';
      const html = this.renderTable().replace(/ /g, '%20');

      // eslint-disable-next-line eqeqeq
      const documentPrefix = this.title != '' ? this.title.replace(/ /g, '-') : 'Sheet';
      const d = new Date();

      const dummy = document.createElement('a');
      dummy.href = mimeType + ', ' + html;
      dummy.download = documentPrefix
          + '-' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          + '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
          + '.xls';
      document.body.appendChild(dummy);
      dummy.click();
    },

    onPrint() {
      const pdf = new jsPDF({
        orientation: this.pdfOrientation,
        format: this.format,
        precision: 2
      });

      pdf.setFontSize(20);
      pdf.text(this.title, 15, 10);
      pdf.setFontSize(7);

      const column = [];
      column.push('No');
      const data = [];
      for (let index in this.columns) {
        column.push(this.columns[index].label);
      }

      for (let key in this.rows) {
        let rows = [];
        rows.push(parseInt(key) + 1);
        for (let index in this.columns) {
          rows.push(this.collect(this.rows[key], this.columns[index].field));
        }
        data.push(rows);
      }

      const head = [column];

      autoTable(pdf, {
        head: head,
        body: data
      });

      pdf.save(this.title + '_' + new Date().getTime() + '.pdf')
    },

    renderTable() {
      let table = '<table><thead>';

      table += '<tr>';
      for (let i = 0; i < this.columns.length; i++) {
        const column = this.columns[i];
        table += '<th>';
        table += column.label;
        table += '</th>';
      }
      table += '</tr>';

      table += '</thead><tbody>';

      for (let i = 0; i < this.rows.length; i++) {
        const row = this.rows[i];
        table += '<tr>';
        for (let j = 0; j < this.columns.length; j++) {
          const column = this.columns[j];
          table += '<td>';
          table += this.collect(row, column.field);
          table += '</td>';
        }
        table += '</tr>';
      }

      table += '</tbody></table>';

      return table;
    },

    dig(obj, selector) {
      let result = obj;
      const splitter = selector.split('.');

      for (let i = 0; i < splitter.length; i++) {
        if (result == undefined)
          return undefined;

        result = result[splitter[i]];
      }

      return result;
    },

    collect(obj, field) {
      if (typeof (field) === 'function')
        return field(obj);
      else if (typeof (field) === 'string')
        return this.dig(obj, field);
      else
        return undefined;
    },

    /* https://codebottle.io/s/31b70f5391
     *
     * @author: Luigi D'Amico (www.8bitplatoon.com)
     */
    synchronizeCssStyles(src, destination, recursively) {
      destination.style.cssText = this.getComputedStyleCssText(src);

      if (recursively) {
        const vSrcElements = src.getElementsByTagName('*');
        const vDstElements = destination.getElementsByTagName('*');

        for (var i = vSrcElements.length; i--;) {
          const vSrcElement = vSrcElements[i];
          const vDstElement = vDstElements[i];
          vDstElement.style.cssText = this.getComputedStyleCssText(vSrcElement);
        }
      }
    },

    // https://gist.github.com/johnkpaul/1754808
    //
    // Please delete Firefox.
    getComputedStyleCssText(element) {
      const cssObject = window.getComputedStyle(element);
      const cssAccumulator = [];

      if (cssObject.cssText !== '') {
        return cssObject.cssText;
      }

      for (let prop in cssObject) {
        if (typeof cssObject[prop] === 'string') {
          cssAccumulator.push(prop + ' : ' + cssObject[prop]);
        }
      }

      return cssAccumulator.join('; ');
    },
  },

  watch: {
    perPageOptions(newOptions) {
      // If defaultPerPage is provided and it's a valid option, set as current per page
      if (newOptions.indexOf(this.defaultPerPage) > -1) {
        this.currentPerPage = parseInt(this.defaultPerPage);
      } else {
        // Set current page to first value
        this.currentPerPage = newOptions[0];
      }
    },

    searchInput(newSearchInput) {
      if (this.searching && this.serverSearch && this.serverSearchFunc)
        this.serverSearchFunc(newSearchInput);
    },

    rows(newRows, oldRows) {
      // If the number of rows change, reset the currentPage to 1
      if (newRows !== oldRows)
        this.currentPage = 1;
    },
  },

  computed: {
    processedRows() {
      let computedRows = this.rows;

      if (this.sortable !== false)
        computedRows = computedRows.sort((x, y) => {
          if (!this.columns[this.sortColumn])
            return 0;

          const cook = x => {
            x = this.collect(x, this.columns[this.sortColumn].field);
            if (typeof (x) === 'string') {
              x = x.toLowerCase();
              if (this.columns[this.sortColumn].numeric)
                x = x.indexOf('.') >= 0 ? parseFloat(x) : parseInt(x);
            }
            return x;
          };

          x = cook(x);
          y = cook(y);

          return (x < y ? -1 : (x > y ? 1 : 0)) * (this.sortType === 'desc' ? -1 : 1);
        });

      if (this.searching && !this.serverSearch && this.searchInput) {
        const searchConfig = {keys: this.columns.map(c => c.field)};

        // Enable searching of numbers (non-string)
        // Temporary fix of https://github.com/krisk/Fuse/issues/144
        searchConfig.getFn = (obj, path) => {
          const property = this.dig(obj, path);
          if (Number.isInteger(property))
            return JSON.stringify(property);
          return property;
        };

        if (this.exactSearch) {
          //return only exact matches
          searchConfig.threshold = 0,
              searchConfig.distance = 0;
        }

        computedRows = (new Fuse(computedRows, searchConfig)).search(this.searchInput);
      }

      return computedRows;
    },

    paginated() {
      let paginatedRows = this.processedRows;

      // if (this.paginate && this.currentPerPage !== -1)
      //   paginatedRows = paginatedRows.slice(
      //       (this.currentPage - 1) * this.currentPerPage,
      //       this.currentPerPage === -1 ? paginatedRows.length + 1 : this.currentPage * this.currentPerPage
      //   );

      return paginatedRows;
    },

    lang() {
      return this.locale in locales ? locales[this.locale] : locales['en'];
    },
  },

  mounted() {
    if (!(this.locale in locales))
      console.error(`vue-materialize-datable: Invalid locale '${this.locale}'`);
    this.sortColumn = this.initSortCol;
  },

  created() {
    this.years = this.dateTo = new Date().toISOString().substr(0, 4);
    this.dateTo = new Date().toISOString().substr(0, 10);
    let d = new Date(this.dateTo);
    d.setDate(d.getDate() - 1);
    this.dateFrom = new Date(d).toISOString().substr(0, 10);
  },
};
</script>

<style scoped>
div.material-table {
  padding: 0;
}

tr.clickable {
  cursor: pointer;
}

#search-input {
  margin: 0;
  border: transparent 0 !important;
  height: 48px;
  color: rgba(0, 0, 0, .84);
}

#search-input-container {
  padding: 0 14px 0 24px;
  border-bottom: solid 1px #DDDDDD;
}

table {
  table-layout: fixed;
}

.table-header {
  height: 64px;
  padding-left: 24px;
  padding-right: 14px;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
  -webkit-display: flex;
  border-bottom: solid 1px #DDDDDD;
}

.table-header .actions {
  display: -webkit-flex;
  margin-left: auto;
}

.table-header .btn-flat {
  min-width: 36px;
  padding: 0 8px;
}

.table-header input {
  margin: 0;
  height: auto;
}

.table-header i {
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}

.table-footer {
  height: 56px;
  padding-left: 24px;
  padding-right: 14px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
  -webkit-align-items: center;
  align-items: center;
  font-size: 12px !important;
  color: rgba(0, 0, 0, 0.54);
}

.table-footer .datatable-length {
  display: -webkit-flex;
  display: flex;
}

.table-footer .datatable-length select {
  outline: none;
}

.table-footer label {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  /* works with row or column */

  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.table-footer .select-wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  /* works with row or column */

  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.table-footer .datatable-info,
.table-footer .datatable-length {
  margin-right: 32px;
}

.table-footer .material-pagination {
  display: flex;
  -webkit-display: flex;
  margin: 0;
}

.table-footer .material-pagination li a {
  color: rgba(0, 0, 0, 0.54);
  padding: 0 8px;
  font-size: 24px;
}

.table-footer .select-wrapper input.select-dropdown {
  margin: 0;
  border-bottom: none;
  height: auto;
  line-height: normal;
  font-size: 12px;
  width: 40px;
  text-align: right;
}

.table-footer select {
  background-color: transparent;
  width: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  height: auto;
  margin-left: 20px;
}

.table-title {
  font-size: 20px;
  color: #000;
}

table tr td {
  padding: 0 0 0 56px;
  height: 48px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: solid 1px #DDDDDD;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

table td, table th {
  border-radius: 0;
}

table tr td a {
  color: inherit;
}

table tr td a i {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);
}

table tr {
  font-size: 12px;
}

table th {
  font-size: 12px;
  font-weight: 500;
  color: #757575;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  height: 56px;
  padding-left: 56px;
  vertical-align: middle;
  outline: none !important;

  overflow: hidden;
  text-overflow: ellipsis;
}

table th:hover {
  overflow: visible;
  text-overflow: initial;
}

table th.sorting-asc,
table th.sorting-desc {
  color: rgba(0, 0, 0, 0.87);
}

table th.sorting:after,
table th.sorting-asc:after {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  word-wrap: normal;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  content: "arrow_back";
  -webkit-transform: rotate(90deg);
  display: none;
  vertical-align: middle;
}

table th.sorting:hover:after,
table th.sorting-asc:after,
table th.sorting-desc:after {
  display: inline-block;
}

table th.sorting-desc:after {
  content: "arrow_forward";
}

table tbody tr:hover {
  background-color: #EEE;
}

table th:last-child,
table td:last-child {
  padding-right: 14px;
}

table th:first-child, table td:first-child {
  padding-left: 24px;
}

.rtl {
  direction: rtl;
}
</style>
