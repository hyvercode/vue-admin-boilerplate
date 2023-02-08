<template>
  <div class="container-fluid">
    <MyDataTable
        title="Booking Rooms List"
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
        @onRowClick="handleViewParticipant"
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
    <b-modal id="m-jobposition" :title="isUpdate?'Update Booking Room':'Create Booking Room'" hide-footer>
      <form>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Room <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <select class="form-control form-select" v-model="bookingRoom.meeting_room_id" required>
                <option value="null" disabled>Choose...</option>
                <option
                    v-for="item in listMeeting"
                    :key="item.id"
                    :value="item.id"
                >
                  {{ item.room_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Title <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <input
                  class="form-control"
                  placeholder="Please input title"
                  v-model="bookingRoom.title"
              />
            </div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">Start Meet</label>
            <div class="col-sm-8">
              <input
                  type="date"
                  placeholder="Please input date"
                  id="start_meet"
                  name="birth_place"
                  class="form-control"
                  v-model="bookingRoom.start_meet"
                  maxlength="20"
              />
            </div>

          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-4 col-form-label">End Meet</label>
            <div class="col-sm-8">
              <input
                  type="date"
                  placeholder="Please input date"
                  id="end_meet"
                  name="birth_place"
                  class="form-control"
                  v-model="bookingRoom.end_meet"
                  maxlength="20"
              />
            </div>

          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Link <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <input
                  type="text"
                  name="birth_place"
                  class="form-control"
                  v-model="bookingRoom.link"
                  maxlength="20"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Description <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <textarea
                  class="form-control"
                  placeholder="Please input description"
                  v-model="bookingRoom.description"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Internal Participant <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <select class="form-control form-select" v-model="participant" @change="handleParticipant" required>
                <option value="null" disabled>Choose...</option>
                <option value="aldiansyah@gmail.com">aldiansyah</option>
                <option value="wahyu@gmail.com">wahyu</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">Internal Participant <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <div class="input-group mb-3">
                <input type="email" class="form-control" v-model="externalParticipant" />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2" @click="handleExternalParticipant">Invite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 mb-3">
          <div class="form-group row">
            <label for="NIK" style="text-align: left" class="col-sm-4 col-form-label">External Participant <span
                class="mandatory">*</span></label>
            <div class="col-sm-8">
              <textarea
                  class="form-control"
                  placeholder="Please input description"
                  v-model="invites"
                  readonly
              ></textarea>
            </div>
          </div>
        </div>
        <div class="d-flex mt-4 float-end">
          <button class="btn btn-primary" style="margin-right: 5px" @click.prevent="doClose">Cancel</button>
          <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import MyDataTable from "../../hyver-vue/components/table/DataTable";
import Utils from "../../../helpers/Utils";
import MeetingService from "@/services/meeting.service";
import RequestBookingRoom from "@/payloads/request/RequestBookingRoom";
import BookingRoomService from "@/services/booking-room.service";
import router from "@/router";

export default {
  name: "Index",
  components: {
    MyDataTable,
  },
  data() {
    return {
      bookingRoom: new RequestBookingRoom(),
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
          label: "Room Name",
          field: "room_name",
          numeric: true,
          html: false,
        },
        {
          label: "Title",
          field: "title",
          numeric: true,
          html: false,
        },
        {
          label: "Description",
          field: "description",
          numeric: true,
          html: false,
        },
        {
          label: "Floor",
          field: "floor",
          numeric: true,
          html: false,
        },
        {
          label: "Start Meeting",
          field: "start_meet",
          numeric: true,
          html: false,
        },
        {
          label: "End Meeting",
          field: "end_meet",
          numeric: true,
          html: false,
        },
      ],
      records: [],
      listMeeting: [],
      listParticipant: [],
      externalParticipant: [],
      participant: [],
      filterRecord: [
        {id: 'id', desc: "Booking Room ID"},
        {id: 'title', desc: "Title"}],
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
    invites(){
      return this.listParticipant
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
    this.getListMeeting()
  },
  methods: {
    doClose() {
      this.$bvModal.hide('m-jobposition');
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      this.bookingRoom.participant = this.invites
      if (!this.isUpdate) {
        BookingRoomService.postCreate(this.bookingRoom).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestBookingRoom();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Booking Room has been created",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
            this.listParticipant = []
            this.bookingRoom = new RequestBookingRoom();
          } else {
            loading.hide();
            this.$bvModal.hide('m-jobposition');
            this.$swal.fire("Error!", response.message, "error");
          }
        });
      } else {
        MeetingService.postUpdate(this.bookingRoom.id, this.bookingRoom).then((response) => {
          if (response.code === 200) {
            this.coverage = new RequestBookingRoom();
            loading.hide();
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Booking Room has been updated",
            });
            this.doRefresh();
            this.$bvModal.hide('m-jobposition');
            this.bookingRoom = new RequestBookingRoom();
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
      this.bookingRoom = new RequestBookingRoom();
      this.$bvModal.show('m-jobposition');
    },

    handleUpdate(prop) {
      this.isUpdate = true;
      this.meetingRoom = prop;
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
          BookingRoomService.delete(prop.id)
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
      BookingRoomService.postUpdate(props.id, payload).then((response) => {
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
      BookingRoomService.getPaginate(params).then((response) => {
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
    getListMeeting() {
      let loading = this.$loading.show();
      MeetingService.getAll().then((response) => {
        if (response.code === 200) {
          this.listMeeting = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Priority" + response.message, "error");
        }
      });
    },
    handleParticipant(){
      this.listParticipant.push(this.participant)
    },
    handleExternalParticipant(){
      this.listParticipant.push(this.externalParticipant)
      this.externalParticipant = null
    },
    async handleViewParticipant(props) {
      await router.push(`/events/booking/participant/${props.id}`);
    },
  },
};
</script>

<style scoped></style>
