<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
<main>
  <div id="hdsd">
  <div class="col-6 offset-3 danhsachsanpham">
      <InputSearchAdmin v-model="this.searchText" />
  </div>
  </div>
  <div class="row m-0 p-0">
      <div class="col-6 mt-3">
        <div class="shadow p-3 rounded bg-body">
          <div class="col-md-12 text-success">
                          <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Nhân Viên</h5>
                          <hr>
            </div>
            <NhanVienList
                          v-if="filterednhanvienCount > 0"
                          :listnguoidung="filterednhanvien"
                          v-model:activeIndex="activeIndex"
                          @delete:nguoidung="deletenhanvien"
                          />
                <p v-else>Không có sản phẩm nào</p>
              </div>
      <div class="row mb-3 thanhbutton">
          <button class="btn btn-sm btn-primary col-3 m-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button class="btn btn-sm btn-success col-3 m-3" @click="goToAddnhanvien">
              <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button
              class="btn btn-sm btn-danger col-3 m-3"
              @click="removeAllnhanvien"
              >
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
            
          </div>
          <div class="col-6 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded"  v-if="activenhanvien">
                      <div class="col-md-12">
                          <NhanVienCard :nguoidung="activenhanvien" />
                      </div>
                  
               
                  </div>
              </div>
            </div>
          
     
  </div>
  

  </main>

    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import NhanVienList from "@/components/NhanVienList.vue";
import NhanVienCard from "@/components/NhanVienCard.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import nhanvienService from "../services/nhanvien.service";
import dathangService from "../services/dathang.service";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    NhanVienList,
    NhanVienCard
  },
  props: ["session_admin"],
  data() {
          return {
              listnhanvien: [],
              activeIndex: -1,  // vị trí liên hệ đang được chọn
              searchText: "",
          };
      },
      watch: {
          // Giám sát các thay đổi của biến searchText.
          // Bỏ chọn phần tử đang được chọn trong danh sách.
          searchText() {
            this.activeIndex = -1;
          },
      },
      computed: {
          // Chuyển các đối tượng  thành chuỗi để tiện cho tìm kiếm.
          nhanvientrings() {
              return this.listnhanvien.map((nhanvien) => {
                   const { hoten, chucvu, diachi, sdt } = nhanvien;
                  return [hoten, chucvu, diachi, sdt].join("");
              });
          },
          filterednhanvien() {
             
                  if (!this.searchText) return this.listnhanvien;
                  const searchTextLower = this.searchText.toLowerCase();
                  console.log("Search Text:", searchTextLower);
                 
                  return this.listnhanvien.filter((_nhanvien, index) =>
                  this.nhanvientrings[index].toLowerCase().includes(searchTextLower)
                  );
              },
          activenhanvien() { // liên hệ đang được chọn kiểm tra
              if (this.activeIndex < 0) return null;
              return this.filterednhanvien[this.activeIndex];
          },
          filterednhanvienCount() {
             return this.filterednhanvien.length; //sl các liên hệ khi tìm kiếm
          },
          },
      methods: {
        async getNhanVien(){
            try{
              this.listnhanvien = await nhanvienService.getAll();
              this.listnhanvien.forEach(async (nhanvien) => {
            const hoadon = await dathangService.getALLIdNhanVien(nhanvien._id);
            if(hoadon){
              nhanvien.sodonquanly=hoadon.length;
            }
            else{
              nhanvien.sodonquanly=0;
            }
           
          });
            }catch(e){
              console.log(e);
              alert("loi thu lai");
              this.$router.push("/danhsachnhanvien");
            }
    },
    refreshList() {
              // làm mới danh sách
              // bỏ chọn
              this.getNhanVien();
              this.activeIndex = -1;
      },
      async removeAllnhanvien() {
              // xoá tất cả liên hệ
              if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
                  try {
                   const resu = await nhanvienService.deleteAll();
                   this.listnhanvien.forEach(async (nhanvien)=>{
                          await dathangService.deleteALLIdNhanVien(nhanvien._id);
                      });
                   
                    alert("Đã xoá");
                    const document =  await nhanvienService.logout();
                   this.$store.commit('setSessionAdmin', document.token);
                  this.$router.push("/admin");
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
      goToAddnhanvien() {
             this.$router.push({ name: "addnhanvien" }); 
          },
      async deletenhanvien(nhanvien) {  // ham cho phuong thuc delete
                  try {
                     
                      await nhanvienService.delete(nhanvien._id);
                      const listhoadon = await dathangService.getALLIdNhanVien(nhanvien._id);
                      if(listhoadon){
                        listhoadon.forEach(async(hoadon)=> {
                           hoadon.idnhanvien = '';
                          await dathangService.update(hoadon._id,hoadon);
                        });
                      }
                      if(nhanvien._id == this.session_admin.id){
                        const resu = await nhanvienService.logout();
                        this.$store.commit('setSessionAdmin', resu.token);
                        alert('Đã xoá tài khoản admin hiện tại');
                        this.$router.push("/admin");
                      }
                      else{
                      alert('Đã xoá');
                      this.refreshList();
                    }
                  } catch (error) {
                      console.log(error);
                  }
             
          },
      },
      mounted() {
              this.refreshList(); // gọi làm mới danh sách khi trang được tải
          },
      beforeMount(){
        if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==2 || this.session_admin.quyen==3)){
          alert('Bạn không có quyền truy cập vào quản lý nhân viên của cửa hàng');
          this.$router.push({ path: "/admin" });
        }
      }
  };
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




</style>
