<template>
  <div class="container-fluid px-3 mt-4">
    <div class="row">
      <div class="col-6 d-flex justify-content-between ps-0">
        <div class="me-lg-3">
          <h6 class="form-title">{{ title }}</h6>
        </div>
      </div>
      <div class="col-6 px-0 text-end">
        <div class="btn-group">
          <button class="btn btn-submit text-black" @click.prevent="$router.go(-1)">
            <i class="material-icons">arrow_back</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormHeader",
  props: {
    title: String
  }
}
</script>

<style scoped>

</style>