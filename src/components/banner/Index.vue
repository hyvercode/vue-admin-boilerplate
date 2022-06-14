<template>
  <div class="container-fluid">
    <MyDataTable
        title="Banner"
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
    <b-modal id="m-banner" :title="isUpdate?'Update Banner':'Create Banner'" hide-footer>
      <form @submit.prevent="submit($event)">
        <div class="form-group mb-3">
          <label>Description <span class="mandatory">*</span></label>
          <input
              type="text"
              class="form-control"
              placeholder="Please input text"
              v-model="banner.banner_name"
              required
          />
        </div>
        <div class="col-lg-6 col-md-6 mb-3">
          <div class="form-group">
            <label for="avatar">Banner <span class="mandatory">*</span></label>
            <input type="file" id="path" name="path" @change="onFileChangeAvatar" accept="image/*"
                   class="form-control" required>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <label for="status" style="text-align: left">Active <span class="mandatory">*</span></label>
          <select class="form-control form-select" v-model="banner.active" required>
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
import RequestBanner from "../../payloads/request/RequestBanner";
import BannerService from "../../services/banner.service";
import MyDataTable from "../hyver-vue/components/table/DataTable";
import Utils from "../../helpers/Utils";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      banner: new RequestBanner(),
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
          label: "Banner Name",
          field: "banner_name",
          numeric: true,
          html: false,
        },
        {
          label: "Status",
          field: "active",
          numeric: false,
          html: false,
        },
      ],
      records: [],
      filterRecord: [
        {id: 'id', desc: "Banner ID"},
        {id: 'banner_name', desc: "Banner Name"},
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
  },
  methods: {
    doClose() {
      this.$bvModal.hide('m-banner');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      if (!this.isUpdate) {
        BannerService.postCreate(this.banner).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestBanner();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Banner has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-banner');
          } else {
            loading.hide();
            this.$bvModal.hide('m-banner');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        BannerService.postUpdate(this.banner.id, this.banner).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestBanner();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Banner has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-banner');
          } else {
            loading.hide();
            this.$bvModal.hide('m-banner');
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
      this.banner = new RequestBanner();
      this.isUpdate = false;
      this.$bvModal.show('m-banner');
    },

    onFileChangeAvatar(e) {
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();
      reader.onload = (ev) => {
        this.banner.path = ev.target.result;
      };
      reader.readAsDataURL(files[0]);
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.banner = prop;
      this.$bvModal.show('m-banner');
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
          BannerService.delete(prop.id)
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
      };
      let loading = this.$loading.show();
      BannerService.getPaginate(params).then((response) => {
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
  },
}
</script>

<style scoped>

</style>
