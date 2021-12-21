<template>
  <div class="pickers">
    <div class="container-fluid px-3 mt-5">
      <div class="row mb-3">
        <div class="col-6 d-flex justify-content-between ps-0">
          <div class="me-lg-3">
            <a href="#" style="font-weight: bold; font-size: 36px">
              Create New Branch</a
            >
          </div>
        </div>
        <div class="col-6 px-0 text-end">
          <div class="btn-group">
            <button class="btn btn-submit text-white" @click="$router.go(-1)">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="card px-3 py-3 mb-3">
          <div class="row">
            <h5>Detail Branch</h5>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Branch Name</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Address</label>
                <input type="text" class="form-control" />
              </div>
            </div>

            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Region</label>
                <input type="text" class="form-control" />
              </div>
            </div>

            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Province</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>Banten</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">City</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>Tangerang Selatan</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleFormControlSelect1">District</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>Serpong</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Village</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Postal Code</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Phone Number</label>
                <input type="email" class="form-control" />
              </div>
            </div>

            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Email</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Contact Person</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Contact Number</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Coordinante</label>
                <input type="email" class="form-control" />
              </div>
            </div>
            <div class="col-lg-6 mb-3">
              <div class="form-group">
                <label for="Name">Status</label>
                <input type="email" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row text-right mt-3">
            <div class="col-lg-12 d-flex justify-content-end">
              <button class="btn btn-primary">Submit</button>
              <button
                class="btn btn-primary"
                @click="$router.go(-1)"
                style="margin-left: 10px !important"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
};
</script>
