<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Old Password</label>
              <div class="input-group mb-3">
                <input :type="type1" v-model="oldPassword" class="form-control" placeholder="******">
                <span class="input-group-text" id="basic-addon1" @click="showOldPassword"><i
                    class="material-icons">{{ type1 === 'text' ? 'remove_red_eye' : 'vpn_key' }}</i></span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">New Password</label>
              <div class="input-group mb-3">
                <input :type="type2" v-model="newPassword" class="form-control" placeholder="******">
                <span class="input-group-text" id="basic-addon2" @click="showNewPassword"><i
                    class="material-icons">{{ type2 === 'text' ? 'remove_red_eye' : 'vpn_key' }}</i></span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Re Password</label>
              <div class="input-group mb-3">
                <input type="password" v-model="rePassword" class="form-control" placeholder="******">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white" @click.prevent="onSubmit">Submit</button>
          <button type="button" class="btn btn-primary text-white" @click.prevent="onClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";

export default {
  name: "Picker",
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      type1: 'password',
      type2: 'password',
      oldPassword: null,
      newPassword: null,
      rePassword: null
    }
  },
  methods: {
    showOldPassword() {
      if (this.type1 === 'password') {
        this.type1 = 'text'
      } else {
        this.type1 = 'password'
      }
    },
    showNewPassword() {
      if (this.type2 === 'password') {
        this.type2 = 'text'
      } else {
        this.type2 = 'password'
      }
    },
    onClose() {
      this.$emit('onClose');
    },
    onSubmit() {
      let payload = {
        old_password: this.oldPassword,
        new_password: this.newPassword,
        password_confirmation: this.rePassword
      }
      let loading = this.$loading.show();
      UserService.postChangePassword(payload).then(
          (response) => {
            if (response.code === 200) {
              loading.hide();
              this.oldPassword = null;
              this.newPassword = null;
              this.$swal.fire(
                  "Success",
                  "Your password has been updated",
                  "success"
              );
              this.onClose();
            } else {
              loading.hide();
              this.$swal.fire("Alert!", response.message, "error");
            }
          }
      );
    }
  }
}
</script>