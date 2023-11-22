<template>
      <AppHeader 
    :session_user="session_user"
    />
     <div class="contaner" id="dangnhap"> 
        <div class="row m-0 p-0">
            <div class="col-12">
            <FormDangNhap
            :user="user"
            @login="login"
            />
        </div>
    </div>
        </div>
        <AppFooter 
    :session_user="session_user"
    />
</template>
<style scoped>

</style>
<script>
 import FormDangNhap from "@/components/FormDangNhap.vue";
 import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import khachhangService from "../services/khachhang.service";
export default {
    components: {
       FormDangNhap,
       AppHeader,
    AppFooter,
    },
    props: ["session_user"],
    data() {
            return {
                user: null
            };
        },
        methods: {
            async login(data) {  // ham goi submit
                try {
                   // gọi login
                   const createdData =  await khachhangService.login(data);
                   if(createdData){
                   await this.$store.commit('setSessionUser', createdData.token)
                   this.message = "Đăng nhập thành công"
                   this.$router.push({ path: "/" });
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