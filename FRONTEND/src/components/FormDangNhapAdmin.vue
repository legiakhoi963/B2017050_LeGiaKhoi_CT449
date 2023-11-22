<template>
    <div class="col-6 offset-3 formdangky">
      <div class="row mt-10">
           <div clas="col-4">
                    <h2>Đăng Nhập</h2>
                    <hr style="margin-left: 10px; margin-right: 10px;"/>
            </div>
      </div>
      <div class="container ml-3">
          <form @submit.prevent="submitForm">
                <div class="row mb-3 mt-3 form-group">
                      <label for="sdt" class="col-sm-12 col-form-label nhaninput">Số điện thoại:</label>
                      <div class="col-12">
                        <input type="text" class="form-control" v-model="adminLogin.sdt" required name="sdt" id="sdt" placeholder="Nhập vào số điện thoại">
                      </div>
                </div>
                <div class="row mb-4 form-group mt-2">
                      <label for="password" class="col-sm-12 col-form-label nhaninput">Mật khẩu:</label>
                      <div class="col-12">
                        <input type="password" class="form-control" required name="pass" v-model="adminLogin.password" id="password" placeholder="Nhập vào mật khẩu">
                      </div>
                </div>
                <div class="row input-btn mb-4 form-group mt-4">
                      <button type="submit" name="dangnhap" class="btn">Đăng Nhập</button>
                </div>
          </form>
          <hr/>
      </div>
  </div>
            
</template>

<script>
export default {
  emits: ["login"],
  props: {
    admin: { type: Object, default: null }, // Dữ liệu admin đăng nhập
  },
  data() {
    return {
      adminLogin: this.admin || { sdt: "", password: "" },
    };
  },
  methods: {
    submitForm() {
      // Xử lý sự kiện đăng nhập ở đây
      this.$emit("login", this.adminLogin);
    },
  },
};
</script>
