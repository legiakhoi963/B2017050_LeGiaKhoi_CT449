<template>
         <AppHeader 
    :session_user="session_user"
    />
       <section class="dangky m-0">
            <div class="container">
                <div class="row">
                  <div class="col-12">
                  <FormDangKy
                  @submit:dangky="DangKy"
                  :user="user"
                  ></FormDangKy>
                  </div>

                  
                </div>
                
            </div>

        </section>
        <AppFooter 
    :session_user="session_user"
    />
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import FormDangKy from "@/components/FormDangKy.vue";
import khachhangService from "../services/khachhang.service";
  export default {
      components: {
    AppHeader,
    AppFooter,
    FormDangKy
},
props: ["session_user"],
data() {
            return {
                user: null
            };
        },
        methods: {
            async DangKy(data) {  // ham goi submit
                try {
                   // gọi login
                   await khachhangService.create(data);
                   this.message = "Đăng Ký thành công"
                   this.$router.push({ path: "/dangnhap" });
                   
                } catch (error) {
                  if(error.response && error.response.status === 404){
                        alert('Số điện thoại đã được sử dụng.')
                    }
                    else{
                        alert('Lỗi dữ liệu, Xin vui lòng thử lại')
                    }
                }
            },
        },
}
</script>
<style>

</style>
