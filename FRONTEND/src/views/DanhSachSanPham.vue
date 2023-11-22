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
                            <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Sản Phẩm</h5>
                            <hr>
                        </div>
                        <HangHoaList
                            v-if="filteredhanghoaCount > 0"
                            :listhanghoa="filteredhanghoa"
                            v-model:activeIndex="activeIndex"
                            @delete:hanghoa="deleteHangHoa"
                            :quyen="this.session_admin.quyen"
                            />
                            <p v-else>Không có sản phẩm nào</p>
                </div>
        <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-3 m-3" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success col-3 m-3" @click="goToAddHangHoa">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button
                class="btn btn-sm btn-danger col-3 m-3"
                @click="removeAllhanghoa"
                >
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
              
            </div>
            <div class="col-6 mt-3">
              <div>
                <div class="shadow mb-3 bg-body rounded"  v-if="activeHangHoa">
                    <div class="row ">
                        <div class="col-md-12 p-4 text-success text-left">
                            <h3 class="col-5">Chi tiết sản phẩm</h3>
                            <div class="hieuchinh col-md-5 text-success">
                        <router-link id="route-link" style="text-decoration: none; color: #2b7778;"
                                :to="{ name: 'editsanpham', params: { id: activeHangHoa._id } }"
                                >
                            <i class="fas fa-edit"></i> Chỉnh sửa
                        </router-link>
                     </div> 
                    <hr>
                        </div>
                        <div class="col-md-12">
                            <SanPhamCard :sanphams="activeHangHoa" />
                        </div>
                    
                 
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
  import HangHoaList from "@/components/HangHoaList.vue";
  import SanPhamCard from "@/components/SanPhamCard.vue";
  import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
  import hanghoaService from "../services/hanghoa.service";
  import hinhanhService from "../services/hinhanh.service";
  import loaihangService from "../services/loaihang.service";
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      InputSearchAdmin,
      HangHoaList,
      SanPhamCard
    },
    props: ["session_admin"],
    data() {
            return {
                listsanpham: [],
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
            hanghoatrings() {
                return this.listsanpham.map((sanpham) => {
                     const { tenhh, tenloai,thuonghieu, ngaysanxuat, hansudung } = sanpham;
                    return [tenhh,,tenloai, thuonghieu,ngaysanxuat,hansudung].join("");
                });
            },
            filteredhanghoa() {
               
                    if (!this.searchText) return this.listsanpham;
                    const searchTextLower = this.searchText.toLowerCase();
                    console.log("Search Text:", searchTextLower);
                   
                    return this.listsanpham.filter((_hanghoa, index) =>
                    this.hanghoatrings[index].toLowerCase().includes(searchTextLower)
                    );
                },
            activeHangHoa() { // liên hệ đang được chọn kiểm tra
                if (this.activeIndex < 0) return null;
                return this.filteredhanghoa[this.activeIndex];
            },
            filteredhanghoaCount() {
               return this.filteredhanghoa.length; //sl các liên hệ khi tìm kiếm
            },
            },
        methods: {
          async getSanPham(){
              try{
                this.listsanpham = await hanghoaService.getAll();
                this.listsanpham.forEach(async (sanpham) => {
              const hinhanh = await hinhanhService.getHinhAnhSanPham(sanpham._id);
              const loaihang = await loaihangService.getById(sanpham.idloai);
              if (hinhanh.length > 0) {
                sanpham.linkanh = hinhanh[0].linkanh;
                
              } else {
                sanpham.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
              }
              if(loaihang){
                sanpham.tenloai = loaihang.tenloai;
              }
              else{
                sanpham.tenloai = '';
              }
            });
              }catch(e){
                console.log(e);
                alert("loi thu lai");
                this.$router.push("/");
              }
      },
      refreshList() {
                // làm mới danh sách
                // bỏ chọn
                this.getSanPham();
                this.activeIndex = -1;
        },
        async removeAllhanghoa() {
          if(this.session_admin.quyen==1 || this.session_admin.quyen==2){
                // xoá tất cả liên hệ
                if (confirm("Bạn muốn xóa tất cả hàng hoá?")) {
                    try {
                        await hanghoaService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
              }else{
                alert("Bạn không có quyền xoá các sản phẩm của cửa hàng");
              }
            },
        goToAddHangHoa() {
          
               this.$router.push({ name: "addsanpham" }); 
            },
        async deleteHangHoa(hanghoa) {  // ham cho phuong thuc delete
                    try {
                       
                        await hanghoaService.delete(hanghoa._id);
                        await hinhanhService.deleteHinhAnhSanPham(hanghoa._id);
                       
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
               
            },
        },
        mounted() {
                this.refreshList(); // gọi làm mới danh sách khi trang được tải
                //alert(this.session_admin.quyen);
            },
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
  