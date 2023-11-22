<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="this.nguoidung">

      <!--Trang Form edit/thêm-->
      <FormNguoiDung
          :nguoidung="nguoidung"
          :mode="mode"
          @submit:nguoidung="updatenguoidung"
          @delete:nguoidung="deletenguoidung"
       
      /> <!--truyen phuoc thuc cho submit -> tao moi hoac update hoac delete-->
      <p>{{ message }}</p>
  </div>
    </main>
 
    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import FormNguoiDung from "@/components/FormNguoiDung.vue";
import nhanvienService from "@/services/nhanvien.service";
import dathangService from "@/services/dathang.service";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    FormNguoiDung,
  },
  props: ["session_admin"],
  data() {
          return {
              nguoidung: null, // du lieu truyen vao form
              message: "",
              mode:'edit', // du lieu truyen vao form
          };
      },
      methods: {
          async getnguoidung() {
              const id = this.$route.params.id;
                  console.log("id nhan vien "+id);
                  try{
                  this.nguoidung = await nhanvienService.getById(id);
                  if(this.nguoidung){
                    this.nguoidung.repassword = this.nguoidung.password;
                  }
                  else{
                    this.nguoidung.repassword='';
                  }
                  
              } catch (error) {
                  console.log(error);
                  // Chuyển sang trang NotFound 
                  this.$router.push({
                      name: "notfoundadmin",
                  });
              }
          },
          async updatenguoidung(data) {  // ham goi submit
              try {
                console.log("gọi update " + data._id);
                  const resu =   await nhanvienService.update(data._id, data);
                  this.message = "Nhân Viên đã được cập nhật thành công.";
                  alert(this.message);  // thông báo thành công
                  this.$router.push("/danhsachnhanvien");
              } catch (error) {
                  console.log(error);
              }
          },
          async deletenguoidung(id) {  // ham cho phuong thuc delete
              if (confirm("Bạn muốn xóa nhân viên này?")) {
                try {
                  console.log("gọi xoá " + id);
                    const reu = await nhanvienService.delete(id);
                  
                     const listhoadon = await dathangService.getALLIdNhanVien(id);
                     if(listhoadon){
                       listhoadon.forEach(async(hoadon)=> {
                          hoadon.idnhanvien = '';
                         await dathangService.update(hoadon._id,hoadon);
                       });
                     }
                     alert('Đã xoá');
                     if(this.nguoidung._id==this.session_admin.id){
                      const document = await nhanvienService.logout();
                      this.$store.commit('setSessionAdmin', document.token);
                     }
                     this.$router.push("/danhsachnhanvien");
                 } catch (error) {
                     console.log(error);
                 }
              }
          },
      },
      beforeMount(){
        if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==2 || this.session_admin.quyen==3)){
          alert('Bạn không có quyền truy cập vào quản lý nhân viên của cửa hàng');
          this.$router.push({ path: "/admin" });
        }
      },
    
      created() {
          this.getnguoidung();
          this.message = "";
      },
          
    
};
</script>
<style>
.text-giohang{
font-size: 3rem;
color: #659fa5;
}
.phancach{
  margin-top: 3rem;
}
</style>
