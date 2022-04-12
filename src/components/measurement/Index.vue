<template>
  <div class="container-fluid">
    <MyDataTable
        title="Measurements"
        :columns="columns"
        :rows="records"
        :clickable="true"
        :sortable="true"
        :paginate="true"
        :total-records="paginate.total"
        :rows-per-page="paginate.recordsPerPage"
        :current-page="paginate.currentPage"
        :last-page="paginate.lastPage"
        :default-per-page="paginate.perPage"
        :next-page-url="paginate.nextPageUrl"
        :prev-page-url="paginate.prevPageUrl"
        v-on:onChangeRowPage="handleChangeRecords"
        v-on:onPreviousPage="prevPage"
        v-on:onNextPage="nextPage"
        :searching="true"
        v-on:onChangeSearch="doSearch"
        v-on:onEnterSearch="doSearch"
        :filter="true"
        :filterRecord="filterRecord"
        v-on:onChangeFilter="doFilterSelected"
        :filterDate="false"
        v-on:onChangeDate="doFilterDate"
        :exportable="true"
        :printable="true"
        :create-button="true"
        v-on:onCreate="handleCreate"
        :refreshable="true"
        v-on:onRefresh="doRefresh"
        :loadingAnimation="false"
    >
      <th
          id="delete"
          slot="thead-tr"
          class="text-center tbl-action-button"
      >
        Actions
      </th>
      <template slot="tbody-tr" slot-scope="props">
        <td class="text-center">
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleUpdate(props.row, e)"
          >
            <i class="material-icons white-text">edit</i>
          </button>
          <button
              class="btn btn-flat nopadding"
              @click="(e) => handleDelete(props.row, e)"
          >
            <i class="material-icons white-text">delete</i>
          </button>
        </td>
      </template>
    </MyDataTable>

    <b-modal id="m-measurement" :title="isUpdate?'Create Measurement':'Update Measurement'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mb-3">
          <label>Measurement Name <span class="mandatory">*</span></label>
          <input
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="measurement.measurement_name"
              required
          />
        </div>
        <div class="col-lg-12 mb-3">
          <label for="unit" style="text-align: left">Unit <span class="mandatory">*</span></label>
          <select class="form-control" v-model="measurement.unit_id" id="unit" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="item in units"
                :key="item.id"
                :value="item.id"
            >
              {{ item.unit_name }}
            </option>
          </select>
        </div>
        <div class="col-lg-12 mb-3">
          <label for="targetType" style="text-align: left">Target Type <span class="mandatory">*</span></label>
          <select class="form-control" v-model="measurement.target_type_id" id="targetType" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="item in targetTypes"
                :key="item.id"
                :value="item.id"
            >
              {{ item.target_type_name }}
            </option>
          </select>
        </div>
        <div class="col-lg-12 mb-3">
          <label for="active" style="text-align: left">Active <span class="mandatory">*</span></label>
          <select class="form-control" v-model="measurement.active" id="active" required>
            <option value="null" disabled>Choose...</option>
            <option
                v-for="item in status"
                :key="item.id"
                :value="item.id"
            >
              {{ item.desc }}
            </option>
          </select>
        </div>
        <div class="d-flex mt-4 float-end">
          <button class="btn btn-primary" style="margin-right: 5px" @click.prevent="doClose">Cancel</button>
          <input type="submit" class="btn btn-primary" value="Submit">
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>

import MyDataTable from "../mih/components/DataTable";
import Utils from "../../helpers/Utils";
import MeasurementService from "../../services/measurement.service";
import RequestMeasurement from "../../payloads/request/RequestMeasurement";
import UnitService from "../../services/unit.service";
import targetTypeService from "../../services/targettype.service";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      measurement: new RequestMeasurement(),
      searchBy: "id",
      searchParam: "",
      dateFrom: "",
      dateTo: "",
      status: Utils.status(),
      columns: [
        {
          label: "ID",
          field: "id",
          numeric: true,
          html: false,
          hidden: true,
        },
        {
          label: "Measurement Name",
          field: "measurement_name",
          numeric: false,
          html: false,
        },
        {
          label: "Unit",
          field: "unit_name",
          numeric: false,
          html: false,
        },
        {
          label: "Target Type",
          field: "target_type_name",
          numeric: false,
          html: false,
        },
        {
          label: "Active",
          field: "active",
          numeric: true,
          html: false,
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Measurement ID"},
        {id: 'measurement_name', desc: "Measurement Name"},
        {id: 'active', desc: "Active"}],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
        total: 0
      },
      isUpdate: false,
      units: [],
      targetTypes: []
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    },
  },
  mounted() {
    this.getPaginate(
        this.dateFrom,
        this.dateTo,
        this.searchBy,
        this.searchParam,
        this.pagination.perPage,
        this.pagination.currentPage
    );
  },
  created() {
    this.getUnits();
    this.getTargetTypes();
  },
  methods: {
    doChangeMonth(month) {
      alert(month)
    },
    doUpload() {
      // Todo here
      alert('Coming soon');
    },
    doClose() {
      this.$bvModal.hide('m-measurement');
    },
    handleCreate() {
      this.isUpdate = false;
      this.measurement = new RequestMeasurement();
      this.$bvModal.show('m-measurement');
    },
    handleUpdate(prop) {
      this.isUpdate = true;
      this.measurement = prop;
      this.$bvModal.show('m-measurement');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        MeasurementService.postCreate(this.measurement).then((response) => {
          if (response.code === 200) {
            this.measurement = new RequestMeasurement();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Record has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-measurement');
          } else {
            loading.hide();
            this.$bvModal.hide('m-measurement');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        MeasurementService.postUpdate(this.measurement.id, this.measurement).then((response) => {
          if (response.code === 200) {
            this.measurement = new RequestMeasurement();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Record has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-measurement');
          } else {
            loading.hide();
            this.$bvModal.hide('m-measurement');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      }
    },
    doRefresh() {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          this.pagination.perPage,
          this.pagination.currentPage
      );
    },
    handleDelete(prop) {
      this.$swal({
        title: "Delete",
        text: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          MeasurementService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "bottom-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Record has been deleted",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Data not deleted", error.response);
              });
        }
      });
    },
    doFilterSelected(pagination) {
      this.searchBy = pagination[0];
      if (this.searchBy === "All") {
        this.searchBy = "id";
        this.searchParam = "";
        this.getPaginate(
            this.dateFrom,
            this.dateTo,
            this.searchBy,
            this.searchParam,
            pagination[1],
            pagination[2]
        );
      }
    },
    doFilterDate(selectedDate) {
      this.dateFrom = selectedDate[0];
      this.dateFrom = selectedDate[1];
    },
    doSearch(props) {
      this.searchParam = props[0];
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          props[0],
          props[1],
          props[2]
      );
    },
    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
      };
      let loading = this.$loading.show();
      MeasurementService.getPaginate(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
            total: response.data.total
          };
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    //Prev Pagination
    prevPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
    //Next Pagination
    nextPage(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
    //Search Record
    handleSearch(limit) {
      this.getPaginate(this.searchBy, this.searchParam, limit[0], limit[1]);
    },
    handleChangeRecords(limit) {
      this.getPaginate(
          this.dateFrom,
          this.dateTo,
          this.searchBy,
          this.searchParam,
          limit[0],
          limit[1]
      );
    },
    getUnits() {
      let loading = this.$loading.show();
      UnitService.getAll().then((response) => {
        if (response.code === 200) {
          this.units = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
    getTargetTypes() {
      let loading = this.$loading.show();
      targetTypeService.getAll().then((response) => {
        if (response.code === 200) {
          this.targetTypes = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
    },
  },
};
</script>

<style scoped></style>
