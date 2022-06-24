<template>
  <div class="container-fluid">
    <MyDataTable
        title="Project Target"
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
        @onCheckToggle="doCheckToggle"
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
    <b-modal id="m-jobposition" :title="isUpdate?'Update Project Target':'Create Project Target'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Title<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Please input text"
                  v-model="projectTarget.title"
                  required
              />
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Year<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <Calendar class="form-control" v-model="projectTarget.year" view="year" dateFormat="yy"/>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Description<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <textarea
                  class="form-control"
                  placeholder="Please input text"
                  v-model="projectTarget.descriptions"
                  required
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Amount Target<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input
                  type="number"
                  class="form-control"
                  placeholder="Please input text"
                  v-model="projectTarget.amount_target"
                  required
              />
            </div>

          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Amount Revenue<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input
                  type="number"
                  class="form-control"
                  placeholder="Please input text"
                  v-model="projectTarget.amount_revenue"
                  required
              />
            </div>

          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Quarter<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input
                  type="number"
                  class="form-control"
                  placeholder="Please input value"
                  v-model="projectTarget.quarter"
                  required
              />
            </div>

          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Project Due Date<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input
                  type="date"
                  placeholder="Please input date"
                  id="request_date"
                  name="birth_place"
                  class="form-control"
                  v-model="projectTarget.year_quarter"
                  maxlength="20"
              />
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">{{ projectTarget.attachments ? 'Attachment' : 'Upload Image' }}<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <input v-if="projectTarget.attachments" type="text" class="form-control" v-model="projectTarget.attachments"
                     placeholder="Example: user_circle">
              <input v-if="!projectTarget.attachments"
                     type="file"
                     accept="image/*"
                     @change="onFileChange"
                     class="form-control">
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-5 col-form-label">Active<span class="mandatory">*</span></label>
            <div class="col-sm-7">
              <select class="form-control form-select" v-model="projectTarget.active" required>
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
          </div>
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
import MyDataTable from "../../hyver-vue/components/table/DataTable";
import Utils from "../../../helpers/Utils";
import RequestEticketCategories from "@/payloads/request/RequestEticketCategories";
import ProjecttargetService from "@/services/projecttarget.service";
import RequestProjectTarget from "@/payloads/request/RequestProjectTarget";
import Calendar from "primevue/calendar";

export default {
  name: "IndexCategories",
  components: {
    MyDataTable,
    Calendar
  },
  data() {
    return {
      projectTarget: new RequestProjectTarget(),
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
          label: "Title",
          field: "title",
          numeric: true,
          html: false,
        },
        {
          label: "Year",
          field: "year",
          numeric: true,
          html: false,
        },
        {
          label: "Target",
          field: "amount_target",
          numeric: true,
          html: false,
        },
        {
          label: "Revenue",
          field: "amount_revenue",
          numeric: false,
          html: false,
        },
        {
          label: "Status",
          field: "active",
          numeric: false,
          html: false,
          hidden: false,
          buttonToggle: true,
          buttonToggleDesc: [
            "Active", "Inactive"
          ]
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Project Target ID"},
        {id: 'title', desc: "Title"},
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
      isUpdate: false
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
    this.projectTarget.year_quarter = new Date().toISOString().substr(0, 10);
    this.projectTarget.year = new Date().toISOString().substr(0, 4);
  },
  methods: {
    doClose() {
      this.$bvModal.hide('m-jobposition');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        ProjecttargetService.postCreateTarget(this.projectTarget).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestProjectTarget();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Project Target has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
          } else {
            loading.hide();
            this.$bvModal.hide('m-jobposition');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        ProjecttargetService.postUpdate(this.projectTarget.id, this.projectTarget).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestEticketCategories();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Project Target has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
          } else {
            loading.hide();
            this.$bvModal.hide('m-jobposition');
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

    handleCreate() {
      this.isUpdate = false;
      this.$bvModal.show('m-jobposition');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.projectTarget = prop;
      this.$bvModal.show('m-jobposition');
    },

    handleDelete(prop) {
      this.$swal({
        title: "Hapus data ini?",
        text: "Data ini akan terhapus selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        timer: 8200,
      }).then((result) => {
        if (result.value) {
          // <-- if confirmed
          ProjecttargetService.delete(prop.id)
              .then(() => {
                this.$swal({
                  position: "bottom-end",
                  toast: true,
                  timer: 3000,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  icon: "success",
                  title: "Success",
                  text: "Hapus Berhasil",
                });
                this.doRefresh();
              })
              .catch((error) => {
                console.log("Gagal Terhapus", error.response);
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

    doCheckToggle(props) {
      let payload = props;
      payload.active = !props.active
      let loading = this.$loading.show();
      ProjecttargetService.postUpdate(props.id, payload).then((response) => {
        if (response.code === 200) {
          this.doRefresh();
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", response.message, "error");
        }
      });
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
      ProjecttargetService.getPaginate(params).then((response) => {
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

    /**
     * Image Change
     * @param e
     */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    /**
     * Convert image to bas64
     * @param file
     */
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.projectTarget.attachments = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped></style>
