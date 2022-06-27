<template>
  <div class="container-fluid">
    <div>
      <!--      <div class="col-12">-->
      <!--        <div class="row">-->
      <!--          <div class="card px-3 py-3 mb-3">-->
      <!--            <h3>{{ bookingRoom.title }}</h3>-->
      <!--            <h5 class="card-title">{{ bookingRoom.start_meet | moment('DD-MMM-YYYY') }} - {{ bookingRoom.end_meet | moment('DD-MMM-YYYY') }}</h5>-->
      <!--            <div class="row">-->
      <!--              <div class="col-12 mb-3">-->
      <!--                <div class="form-group">-->
      <!--                  <label for="Name">Title</label>-->
      <!--                  <input-->
      <!--                      type="text"-->
      <!--                      class="form-control"-->
      <!--                      v-model="bookingRoom.room_name"-->
      <!--                      placeholder="Please input text"-->
      <!--                      required-->
      <!--                      readonly-->
      <!--                  />-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              &lt;!&ndash;              <div class="col-12 mb-3">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div class="form-group">&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <label for="Name">Description</label>&ndash;&gt;-->
      <!--              &lt;!&ndash;                  <ckeditor&ndash;&gt;-->
      <!--              &lt;!&ndash;                      :editor="editor"&ndash;&gt;-->
      <!--              &lt;!&ndash;                      v-model="eticket.body"&ndash;&gt;-->
      <!--              &lt;!&ndash;                      :config="editorConfig"&ndash;&gt;-->
      <!--              &lt;!&ndash;                  ></ckeditor>&ndash;&gt;-->
      <!--              &lt;!&ndash;                </div>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </div>&ndash;&gt;-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="row">-->
      <!--          <div class="card px-3 py-3 mb-3 scroll-comment">-->
      <!--            <div v-for="item in listParticipant" :key="item.id">-->
      <!--              <div class="flex-row bd-highlight mb-3">-->
      <!--                <div class="p-2 bd-highlight d-flex">-->
      <!--                  <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"-->
      <!--                       class="avatar-xl rounded-circle mb-4 bg-gray-100">-->

      <!--                  <div class="p-2 bd-highlight">-->
      <!--                    <h5 style="text-align: left">{{ item.participant }}</h5>-->
      <!--                    <p style="text-align: left; font-size: 10px">{{ item.created_at | moment('DD-MMM-YYYY') }}</p>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--                <div class="solid clearfix"/>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="row">
        <div class="col-6">
          <div class="card px-3 py-3 mb-3 scroll-comment" style="text-align: center">
            <h5 style="text-align: center">Room Info</h5>
            <br>
            <h3>{{ bookingRoom.title }}</h3>
            <h5 class="card-title">{{ bookingRoom.start_meet | moment('DD-MMM-YYYY') }} -
              {{ bookingRoom.end_meet | moment('DD-MMM-YYYY') }}</h5>
            <div class="card-body">
              <h5>{{ bookingRoom.description }}</h5><br>
              <a :href="bookingRoom.link" target="_blank">{{ bookingRoom.link }}</a>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card px-3 py-3 mb-3 scroll-comment">
            <h5 style="text-align: center">Room Participant</h5>
            <br>
            <div v-for="item in listParticipant" :key="item.id">
              <div class="flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight d-flex">
                  <img alt="No Image" src="~@/assets/images/icons/photo-bg.png"
                       style="height: 60px; width: 60px"
                       class="avatar-xl rounded-circle mb-4 bg-gray-100">

                  <div class="p-2 bd-highlight">
                    <h5 style="text-align: left">{{ item.participant }}</h5>
                    <p style="text-align: left; font-size: 10px">{{
                        item.created_at | moment('DD-MMM-YYYY')
                      }}</p>
                  </div>
                </div>
                <div class="solid clearfix"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Util from "@/helpers/Utils";
import VueCookies from "vue-cookies";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BookingRoomService from "@/services/booking-room.service";
import RequestBookingRoom from "@/payloads/request/RequestBookingRoom";
import MeetingService from "@/services/meeting.service";

export default {
  name: "History",
  data() {
    return {
      bookingRoom: new RequestBookingRoom(),
      listParticipant: [],
      meetingRoom: [],
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        height: 400,
        // The configuration of the editor.
      },
    };
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.getListParticipant();
    this.getBookingRoom();
  },
  methods: {
    getListParticipant() {
      let loading = this.$loading.show();
      BookingRoomService.getListParticipant(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.listParticipant = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Comment " + response.message, "error");
        }
      });
    },
    getBookingRoom() {
      let loading = this.$loading.show();
      BookingRoomService.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.bookingRoom = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Post " + response.message, "error");
        }
      });
    },
    getMeetingRoom() {
      let loading = this.$loading.show();
      MeetingService.getShow(this.bookingRoom.meeting_room_id).then((response) => {
        if (response.code === 200) {
          this.meetingRoom = response.data;
          console.log(this.meetingRoom)
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Meeting " + response.message, "error");
        }
      });
    }
  }
}
</script>

<style scoped>
.solid {
  border-top: 1px solid #bbb;
}

.scroll-comment {
  height: 700px;
  overflow: scroll;
  /*scrollbar-width: thin;*/
}

/* width */
.scroll-comment::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.scroll-comment::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scroll-comment::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.scroll-comment::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.span-right {
  display: block;
  text-align: left;
  word-break: break-word;
  overflow-x: scroll;
}

.span-left {
  word-break: break-word;
}

.ck-editor__editable {
  min-height: 300px;
}
</style>
