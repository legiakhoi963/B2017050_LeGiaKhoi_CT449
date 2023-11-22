<template>
<header>
  <nav id="menu" class="navbar navbar-expand-lg p-2 bg-success">
  <div class="container-fluid m-0 p-0">
      <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0">
      <li class="nav-item btn btn-warning m-2 p-0">
        <router-link :to="{ name: 'trangchu' }" class="nav-link">Trang Chủ
        </router-link>
        </li>
      </ul>
      </div>
  </div>
  </nav>
  </header>
  <main>
    <div class="contaner" id="dangnhap"> 
        <div class="row m-0 p-0">
            <div class="col-12">
            <FormDangNhapAdmin
            :admin="admin"
            @login="login"
            />
        </div>
    </div>
        </div>
  </main>
  <AppFooterAmin/>
</template>
<style>
 @import "@/assets/stype.css"; 
 .lkfooter .copy{
  margin-left: 2rem;
  margin-top: 1rem;
    color: rgb(57, 55, 55);
    margin-bottom: 6rem;
   
}
</style>
<script>
import FormDangNhapAdmin from "@/components/FormDangNhapAdmin.vue";
 import AppFooterAmin from "@/components/AppFooterAdmin.vue"; 
import nhanvienService from "../services/nhanvien.service";
export default {
    components: {
       FormDangNhapAdmin,
       AppFooterAmin,
   
    },
    props: ["session_admin"],
    data() {
            return {
                admin: null
            };
        },
        methods: {
            async login(data) {  // ham goi submit
                try {
                   // gọi login
                   const createdData =  await nhanvienService.login(data);
                   if(createdData){
                   await this.$store.commit('setSessionAdmin', createdData.token);
                   this.message = "Đăng nhập thành công"
                   this.$router.push({ path: "/admin" });
                   console.log(createdData.message);
                }
                } catch (error) {
                    
                    if(error.response && error.response.status === 404){
                        alert('Số điện thoại hoặc password của bạn không chính xác')
                    }
                    else{
                        alert('Lỗi dữ liệu, xin vui lòng thử lại')
                    }
                }
            },
        },
}
</script>