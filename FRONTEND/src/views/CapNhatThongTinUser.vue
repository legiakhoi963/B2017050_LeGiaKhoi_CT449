<template>
  <div>
    <AppHeader :session_user="session_user" />
<main>
  <div class="row mb-5 mt-5 thongtin">
          <div class="col-md-4 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded">
              <div class="col-md-12">
              <div>
                <div class="shadow p-2 mb-5 bg-body rounded">
                    <div class="row p-4 " v-if="this.khachhang">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-user"></i></span>Thông tin cá nhân</h5>
                           <h5 class="text-primary hienchinh" @click="formhienthi"><i class="fas fa-edit"></i> Chỉnh sửa</h5>
                            <hr>

</div>
<div class="col-md-12 mt-2">
  <b>Họ Tên :</b> {{this.khachhang.hoten}}
</div>
<div class="col-md-12 mt-2">
  <b>Số điện thoại: </b>
    {{this.khachhang.sdt}}
</div>
<div class="col-md-12 mt-2">
    <b>
    Địa chỉ: 
  </b>
 {{this.khachhang.diachi}}

</div>


        </div>
        </div>

        </div>
        </div>
        </div>
        </div>
        </div>
        <div class="col-md-6" v-if="this.form">
        <div class="shadow mb-3 p-4 bg-body rounded">
                  <h5 class="mt-3 text-center">Cập nhật thông tin</h5>
                <!--Hiển thị form-->
                <FormCapNhatThongTinUser
                    :nguoidung="khachhang"
                    :mode="mode"
                    @submit:nguoidung="updatenguoidung"
                    @delete:nguoidung="deletenguoidung"
                />
        </div>
        </div>


</div>


</main>

<AppFooter :session_user="session_user"/>
</div>
</template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import FormCapNhatThongTinUser from "@/components/FormCapNhatThongTinUser.vue";
  import khachhangService from "@/services/khachhang.service";
  import dathangService from "@/services/dathang.service";
  export default {
    components: {
      AppHeader,
      AppFooter,
      FormCapNhatThongTinUser
    
    },
    props: ["session_user"],
    data() {
            return {
              khachhang: null,
              form: false,
              mode: 'edit'
            };
        },
      methods: {
        async getkhachhang(){
          const id = this.$route.params.id;
            try{
              this.khachhang = await khachhangService.getById(id);
            }catch(e){
              console.log(e);
              this.$router.push("/notfound");
            }

    },
         async updatenguoidung(data) {  // ham goi submit
              try {
                alert("update");
                console.log("gọi update " + data._id);
                  const resu = await khachhangService.update(data._id, data);
                  this.message = "Cập nhật thông tin thành công";
                  alert(this.message);  // thông báo thành công
                 this.getkhachhang();
              } catch (error) {
                  console.log(error);
              }
          },
            async deletenguoidung(id) {  // ham cho phuong thuc delete
              if (confirm("Bạn muốn xóa tài khoản này?")) {
                try {
                    console.log(id);
                   console.log('Đã gọi xoá khách hàng');
                   const resu =  await dathangService.deleteALLIdKhachhang(id);
                   const document =  await khachhangService.logout();
                   await this.$store.commit('setSessionUser', document.token);
                    const re =  await khachhangService.delete(id);
                    this.$router.push({ path: "/" });
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
    formhienthi () {
      this.form = !this.form;
      if(this.form==false){
        this.getkhachhang();
      }
    }
  },
  mounted() {
        this.getkhachhang(); // gọi làm mới danh sách khi trang được tải
          },
  }
</script>
  <style scoped>
  .thanhbutton {
    text-align: center;
    margin-top: 0;
  }
  #hdsd{
    margin-top: 2rem;
  }
  .process{
  margin-top: 1.5rem ;
  color: #000;
  font-size: 1.8rem;
  }
  
  .thongtin{
    margin-left: 10rem;
  }
  .hienchinh {
    cursor: pointer;
  }
  
  </style>
  