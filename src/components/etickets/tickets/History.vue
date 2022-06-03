<template>
  <div class="container-fluid">
    <div>
      <div class="col-12">
        <div class="card px-3 py-3 mb-3 scroll-comment">
          <div v-for="item in eticketHistory" :key="item.id">
            <div class="flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight d-flex">
                <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"
                     class="avatar-xl rounded-circle mb-4 bg-gray-100">

                <div class="p-2 bd-highlight">
                  <h5 style="text-align: left">{{ item.first_name }} {{ item.last_name }}</h5>
                  <p style="text-align: left; font-size: 10px">{{ item.created_at | moment('DD-MMM-YYYY') }}</p>
                </div>
              </div>
              <div class="span-right">
                <span>{{ item.notes }}</span>
              </div>
              <div class="solid clearfix"/>
            </div>
<!--            <div class="flex-row bd-highlight mb-3">-->
<!--              <div class="p-2 bd-highlight d-flex">-->
<!--                <img alt="No Image" src="~@/assets/images/icons/photo-bg.png" style="height: 60px; width: 60px"-->
<!--                     class="avatar-xl rounded-circle mb-4 bg-gray-100">-->

<!--                <div class="p-2 bd-highlight">-->
<!--                  <h5 style="text-align: left">ALDIANSYAH 2</h5>-->
<!--                  <p style="text-align: left; font-size: 10px">2022-07-11</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="clearfix"/>-->
<!--              <div class="span-right">-->
<!--                <span>INI ADALAH BODY 1</span>-->
<!--              </div>-->
<!--            </div>-->
          </div>
<!--          <div class="solid clearfix"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from "@/helpers/Utils";
import VueCookies from "vue-cookies";
import RequestHistory from "@/payloads/request/RequestHistory";
import EtickethistoryService from "@/services/etickethistory.service";

export default {
  name: "History",
  data() {
    return {
      history: new RequestHistory(),
      eticketHistory: [],
    };
  },
  created() {
    this.user = Util.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.getListHistory();
  },
  methods: {
    getListHistory() {
      let loading = this.$loading.show();
      EtickethistoryService.getAllById(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.eticketHistory = response.data;
          loading.hide();
        } else {
          loading.hide();
          this.$swal.fire("Error!", "Comment " + response.message, "error");
        }
      });
    },
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
</style>
