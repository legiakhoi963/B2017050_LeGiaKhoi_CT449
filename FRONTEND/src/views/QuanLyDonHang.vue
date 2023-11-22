<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
<main>
  <div id="hdsd">
  <div class="col-6 offset-3 donhang danhsachsanpham">
      <InputSearchAdmin v-model="this.searchText" />
  </div>
  </div>
  <div class="row m-0 p-0">
      <div class="col-6 mt-3 donhang">
        <div class="shadow p-3 rounded bg-body">
          <div class="col-md-12 text-success">
                          <h5> <span> <i class="fa fa-shipping-fast  "></i></span> {{this.tieude}}</h5>
                          <hr>
                      </div>
                      <HoaDonList
                          v-if="filteredDatHangCount > 0"
                          :listdathang="filteredDatHang"
                          v-model:activeIndex="activeIndex"
                          />
                          <p v-else>Không có sản phẩm nào</p>
              </div>
      <div class="row mb-3 thanhbutton">
          <button class="btn btn-sm btn-primary col-3 m-3" @click="refreshList()">
              <i class="fas fa-redo"></i> Làm mới
          </button>
          <button
              class="btn btn-sm btn-danger col-3 m-3"
              @click="removeAllDatHang" v-if="this.xoatatca"
              >
              <i class="fas fa-trash"></i> Xóa tất cả
          </button>
      </div>
            
          </div>
          <div class="col-6 mt-3">
            <div>
              <div class="shadow mb-3 bg-body rounded"  v-if="activeDatHang">
                  <div class="row ">
                      
                          <HoaDonCard :dondathang="activeDatHang"
                          :xacnhan="xacnhan"
                          :huydon="huydon"
                          :capnhat="capnhat"
                          :xoa="xoa"
                          :idadmin="session_admin.id"
                          @updatehoadon="updateHoaDon"
                          @deletehoadon="deleteHoaDon"
                          />
                     
               
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
import HoaDonList from "@/components/HoaDonList.vue";
import dathangService from "@/services/dathang.service";
import chitietdathangService from "@/services/chitietdathang.service";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import HoaDonCard from "../components/HoaDonCard.vue";
import khachhangService from "@/services/khachhang.service";
import nhanvienService from "@/services/nhanvien.service";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    HoaDonList,
    HoaDonCard
  },
  props: ["session_admin"],
  data() {
          return {
            listdathang: [],
            activeIndex: -1,  // vị trí liên hệ đang được chọn
            searchText: "",
            xacnhan: false,
            huydon: false,
            capnhat: false,
            xoa: false,
            tieude:'',
            xoatatca:false,
          };
      },
      watch: {
          // Giám sát các thay đổi của biến searchText.
          // Bỏ chọn phần tử đang được chọn trong danh sách.
          '$route.query.tinhtrang'(newTinhtrang, oldTinhtrang) {
              // Kiểm tra xem giá trị mới có khác giá trị cũ không
              if (newTinhtrang !== oldTinhtrang) {
                // Gọi phương thức để cập nhật danh sách hóa đơn
                this.refreshList();
              }
            },
          searchText() {
            this.activeIndex = -1;
          },
      },
      computed: {
          // Chuyển các đối tượng  thành chuỗi để tiện cho tìm kiếm.
          DatHangtrings() {
        return this.listdathang.map((sanpham) => {
            const { ngaydat, ngaygiao, tinhtrang, tongtien, diachigiao,idkhachhang,tenkhachhang,sdt } = sanpham;
            return [ngaydat, ngaygiao, tinhtrang, tongtien, diachigiao,idkhachhang,tenkhachhang,sdt].join("");
        });
    },
    filteredDatHang() {
        if (!this.searchText) return this.listdathang;
        const searchTextLower = this.searchText.toLowerCase();
        console.log("Search Text:", searchTextLower);
        return this.listdathang.filter((_DatHang, index) =>
            this.DatHangtrings[index].toLowerCase().includes(searchTextLower)
        );
    },
          activeDatHang() { // liên hệ đang được chọn kiểm tra
              if (this.activeIndex < 0) return null;
              return this.filteredDatHang[this.activeIndex];
          },
          filteredDatHangCount() {
             return this.filteredDatHang.length; //sl các liên hệ khi tìm kiếm
          },
          },
      methods: {
        async getSPdathang(){
          this.xacnhan=false;
          this.huydon=false;
          this.capnhat=false;
          this.xoa=false;
          this.xoatatca=false;
      try{
           const tinhtrang = this.$route.query.tinhtrang;
           const listtam = await dathangService.getAll();
      if(tinhtrang=='Chờ xác nhận'){
        this.listdathang = listtam.filter(item => item.tinhtrang === 'Chờ xác nhận');
        this.xacnhan=true;
        this.huydon=true;
        this.tieude="Đơn Hàng Mới"
      }
      else if(tinhtrang=='Đang giao'){
        this.listdathang =  listtam.filter(item => item.tinhtrang === 'Đang giao' || item.tinhtrang === 'Đã xác nhận');
        this.capnhat=true;
        this.tieude="Cập Nhật Đơn Hàng"
      }
      else if(tinhtrang=='Đã nhận hàng'){
        this.listdathang =  listtam.filter(item => item.tinhtrang === 'Đã nhận hàng' || item.tinhtrang === 'Đã huỷ');
        this.xoa=true;
        this.tieude="Danh Sách Đơn Hàng"
        this.xoatatca=true;
      }
      else{
        this.listdathang = listtam;
      }
      this.listdathang.forEach(async (donhang)=>{
        const user = await khachhangService.getById(donhang.idkhachhang);
        if(donhang.idnhanvien!=null && donhang.idnhanvien!=''){
        const nhanvien = await nhanvienService.getById(donhang.idnhanvien);
        if(nhanvien){
          donhang.tennhanvien = nhanvien.hoten;
        }
      }
        if(user){
          donhang.tenkhachhang = user.hoten;
          donhang.sdt = user.sdt;
        }
        else{
          donhang.tenkhachhang = '';
          donhang.sdt = '';
        }
       
      });
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
    }
    },
    async updateHoaDon (hoadon){
      try{
        //gọi update
        hoadon.ngaydat
        const resu = await dathangService.update(hoadon._id, hoadon);
        alert("Cập nhật thành công");
        this.refreshList();
    
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }

    },
    refreshList() {
              // làm mới danh sách
              // bỏ chọn
              this.getSPdathang();
              this.activeIndex = -1;
      },
      async removeAllDatHang() {
              // xoá tất cả liên hệ
              if (confirm("Bạn muốn xóa tất cả đơn hàng đã hoàn thành?")) {
                  try {
                     this.listdathang.forEach(async (dathang)=> {
                      await dathangService.delete(dathang._id);
                      await chitietdathangService.deleteALLIdDatHang(dathang._id);
                    });
                     alert("Xoá thành công");
                      this.refreshList();
                  } catch (error) {
                      console.log(error);
                  }
              }
          },
      async deleteHoaDon(HoaDon) {  // ham cho phuong thuc delete
                  try {
                     console.log('gọi xoá  ' + HoaDon._id);
                      await dathangService.delete(HoaDon._id);
                      await chitietdathangService.deleteALLIdDatHang(HoaDon._id);
                      alert("Đã xoá thành công");
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
        if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==2 || this.session_admin.quyen==4)){
          alert('Bạn không có quyền truy cập vào quản lý đơn hàng');
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

.donhang{

}


</style>
