<template>
  <div class="container-fluid">
    <MyDataTable
        title="Families"
        :columns="columns"
        :rows="records"
        :clickable="true"
        :sortable="true"
        :paginate="true"
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
        create-button-title="Add Family"
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
              @click.prevent="(e) => handleUpdate(props.row, e)"
          >
            <i class="material-icons tbl-material-icons text-info">edit</i>
          </button>
          <button
              class="btn btn-flat nopadding"
              @click.prevent="(e) => handleDelete(props.row, e)"
          >
            <i class="material-icons tbl-material-icons text-danger">delete</i>
          </button>
        </td>
      </template>
    </MyDataTable>
    <b-modal id="m-unit" :title="isUpdate?'Update Family Member':'Create Family Member'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="mb-3">
          <div class="form-group mt-1 mb-3">
            <label>First Name</label>
            <input
                type="text"
                class="form-control"
                placeholder="Please input text"
                v-model="family.first_name"
                required
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group mt-1 mb-3">
            <label>Last Name</label>
            <input
                type="text"
                class="form-control"
                placeholder="Please input text"
                v-model="family.last_name"
                required
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group">
            <label for="phone"
            >Maritial Status <span class="mandatory">*</span></label
            >
            <select
                class="form-control"
                id="maritial_status"
                name="maritial_status"
                v-model="family.maritial_status"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Widower">Widower</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group">
            <label>Religion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Please input text"
                v-model="family.religion"
                required
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="form-group">
            <label for="phone"
            >Identity Type <span class="mandatory">*</span></label
            >
            <select
                class="form-control"
                id="identity_type"
                name="identity_type"
                v-model="family.identity_type"
            >
              <option value="KTP">KTP</option>
              <option value="SIM">SIM</option>
              <option value="PASSPORT">PASSPORT</option>
              <option value="QTAS">QTAS</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group">
            <label for="phone"
            >Identity Number <span class="mandatory">*</span></label
            >
            <input
                type="text"
                placeholder="Please input number"
                id="identity_number"
                name="identity_number"
                @keypress="isNumber($event)"
                class="form-control"
                v-model="family.identity_number"
                maxlength="20"
                required
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="form-group">
            <label for="name"
            >Blood Type <span class="mandatory">*</span></label
            >
            <input
                type="text"
                placeholder="Please input text"
                id="blood_type"
                name="blood_type"
                maxlength="40"
                class="form-control"
                v-model="family.blood_type"
                required
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group">
            <label for="birth_place"
            >Birth Place <span class="mandatory">*</span></label
            >
            <input
                type="text"
                placeholder="Please input text"
                id="birth_place"
                name="birth_place"
                class="form-control"
                v-model="family.birth_place"
                maxlength="50"
                required
            />
          </div>
        </div>

        <div class="mb-3">
          <div class="form-group">
            <label for="birth_date"
            >Birth Date <span class="mandatory">*</span></label
            >
            <input
                type="date"
                placeholder="Please input date"
                id="birth_date"
                name="birth_place"
                class="form-control"
                v-model="family.birth_date"
                maxlength="20"
                required
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="form-group">
            <label for="Name"
            >Gender <span class="mandatory">*</span></label
            >
            <select
                class="form-control"
                id="gender"
                name="gender"
                v-model="family.gender"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
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
import RequestFamily from "../../payloads/request/RequestFamily";
import FamilyService from "../../services/family.service";
import MyDataTable from "../hyver-vue/components/table/DataTable";
import Utils from "../../helpers/Utils";

export default {
  name: "EmployeeFamily",
  components: {
    MyDataTable,
  },
  data() {
    return {
      family: new RequestFamily(),
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
        },
        {
          label: "First Name",
          field: "first_name",
          numeric: true,
          html: false,
        },
        {
          label: "Last Name",
          field: "last_name",
          numeric: true,
          html: false,
        },
        {
          label: "Maritial Status",
          field: "maritial_status",
          numeric: true,
          html: false,
        },
        {
          label: "Gender",
          field: "gender",
          numeric: true,
          html: false,
        },
        {
          label: "Religion",
          field: "religion",
          numeric: true,
          html: false,
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Family ID"},
        {id: 'first_name', desc: "Family Name"},
        {id: 'active', desc: "Active"}],
      pagination: {
        recordsPerPage: [5, 10, 50, 100, 500, 1000],
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: "",
        prevPageUrl: "",
      },
      isUpdate: false
    };
  },
  computed: {
    paginate() {
      return this.pagination;
    }
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
  methods: {
    doClose() {
      this.$bvModal.hide('m-unit');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        this.family.employee_id = Utils.decrypt(this.$route.query.id)
        FamilyService.postCreate(this.family).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestFamily();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Family has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-unit');
          } else {
            loading.hide();
            this.$bvModal.hide('m-unit');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        FamilyService.postUpdate(this.family.id, this.family).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestFamily();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Family has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-unit');
          } else {
            loading.hide();
            this.$bvModal.hide('m-unit');
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
      this.family = new RequestFamily();
      this.isUpdate = false;
      this.$bvModal.show('m-unit');
    },

    handleAddMember() {
      this.unit = new RequestFamily();
      this.isUpdate = false;
      this.$bvModal.show('m-addmember');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.family = prop;
      this.$bvModal.show('m-unit');
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
          FamilyService.delete(prop.id)
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
    getPaginate(dateFrom, dateTo, searchBy, searchParam, limit, page) {
      let params = {
        dateFrom: dateFrom,
        dateTo: dateTo,
        searchBy: searchBy,
        searchParam: searchParam,
        limit: limit,
        page: page,
        employee_id: Utils.decrypt(this.$route.query.id)
      };
      let loading = this.$loading.show();
      FamilyService.getPaginate(params).then((response) => {
        if (response.code === 200) {
          this.records = response.data.data;
          this.pagination = {
            currentPage: response.data.current_page,
            perPage: response.data.per_page,
            lastPage: response.data.last_page,
            prevPageUrl: response.data.prev_page_url,
            nextPageUrl: response.data.next_page_url,
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
  }
}
</script>

<style scoped>

</style>