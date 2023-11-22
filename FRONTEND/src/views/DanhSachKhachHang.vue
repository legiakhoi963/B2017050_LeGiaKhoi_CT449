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
                          <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Khách Hàng</h5>
                          <hr>
            </div>
            <KhachHangList
                          v-if="filteredkhachhangCount > 0"
                          :listnguoidung="filteredkhachhang"
                          v-model:activeIndex="activeIndex"
                          @delete:nguoidung="deletekhachhang"
                          />
                <p v-else>Không có sản phẩm nào</p>
              </div>
      <div class="row mb-3 thanhbutton">
          <button class="btn btn-sm btn-primary col-3 m-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button
              class="btn btn-sm btn-danger col-3 m-3"
              @click="removeAllkhachhang"
              >
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
            
          </div>
          <div class="col-6 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded"  v-if="activekhachhang">
                      <div class="col-md-12">
                          <KhachHangCard :nguoidung="activekhachhang" />
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
import KhachHangList from "@/components/KhachHangList.vue";
import KhachHangCard from "@/components/KhachHangCard.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import khachhangService from "@/services/khachhang.service";
import dathangService from "@/services/dathang.service";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    KhachHangList,
    KhachHangCard
  },
  props: ["session_admin"],
  data() {
          return {
              listkhachhang: [],
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
          khachhangtrings() {
              return this.listkhachhang.map((sanpham) => {
                   const { hoten, chucvu, diachi, sdt } = sanpham;
                  return [hoten, chucvu, diachi, sdt].join("");
              });
          },
          filteredkhachhang() {
             
                  if (!this.searchText) return this.listkhachhang;
                  const searchTextLower = this.searchText.toLowerCase();
                  console.log("Search Text:", searchTextLower);
                 
                  return this.listkhachhang.filter((_khachhang, index) =>
                  this.khachhangtrings[index].toLowerCase().includes(searchTextLower)
                  );
              },
          activekhachhang() { // liên hệ đang được chọn kiểm tra
              if (this.activeIndex < 0) return null;
              return this.filteredkhachhang[this.activeIndex];
          },
          filteredkhachhangCount() {
             return this.filteredkhachhang.length; //sl các liên hệ khi tìm kiếm
          },
          },
      methods: {
        async getkhachhang(){
            try{
              this.listkhachhang = await khachhangService.getAll();
              this.listkhachhang.forEach(async (khachhang) => {
            const hoadon = await dathangService.getALLIdKhachhang(khachhang._id);
            if(hoadon){
              khachhang.sodondamua=hoadon.length;
            }
            else{
              khachhang.sodondamua=0;
            }
           
          });
            }catch(e){
              console.log(e);
              alert("loi thu lai");
              this.$router.push("/danhsachkhachhang");
            }
    },
    refreshList() {
              // làm mới danh sách
              // bỏ chọn
              this.getkhachhang();
              this.activeIndex = -1;
      },
      async removeAllkhachhang() {
              // xoá tất cả liên hệ
              if (confirm("Bạn muốn xóa tất cả khách hàng?")) {
                  try {
                    console.log("Gọi xoá tất cả");
                    const resu = await khachhangService.deleteAll();
                    console.log(resu==null);
                      // xoá các hoá đơn có idkhachhang= khách hàng;
                      this.listkhachhang.forEach(async (khachhang)=>{
                          await dathangService.deleteALLIdKhachhang(khachhang._id);
                      });
                    const document =  await khachhangService.logout();
                   this.$store.commit('setSessionUser', document.token);
                    alert("Đã xoá");
                      this.refreshList();
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
      async deletekhachhang(khachhang) {  // ham cho phuong thuc delete
       
                  try {
                    console.log(khachhang._id);
                   const re =  await khachhangService.delete(khachhang._id);
                   console.log('Đã gọi xoá khách hàng');
                    // if(session_user && session_user.id && session_user.id==khachhang._id){
                     // this.$store.commit('setSessionUser', null);
                     // }
                   const resu =  await dathangService.deleteALLIdKhachhang(khachhang._id);
                  const document =  await khachhangService.logout();
                   this.$store.commit('setSessionUser', document.token);
                  alert('Đã xoá');
                      this.refreshList();
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
          alert('Bạn không có quyền truy cập vào quản lý khách hàng của cửa hàng');
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
