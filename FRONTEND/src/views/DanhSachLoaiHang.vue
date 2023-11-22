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
                            <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Danh Sách Loại Hàng</h5>
                            <hr>
              </div>
              <LoaiHangList
                            v-if="filteredloaihangCount > 0"
                            :listloaihang="filteredloaihang"
                            v-model:activeIndex="activeIndex"
                            @delete:loaihang="deleteloaihang"
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
                @click="removeAllloaihang"
                >
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
    </div>
            <div class="col-6 mt-3">
              <div>
                <div class="shadow mb-3 bg-body rounded"  v-if="activeloaihang && this.add==false">
                        <div class="col-md-12">
                          <!--form chỉnh sửa-->
                          
                        <FormLoaiHang 
                        :loaihang="activeloaihang"
                        :mode="mode"
                        @submit:loaihang="updateloaihang"
                        @delete:loaihang="deleteloaihangForm"
                    />

                        </div>
                    
                 
                    </div>
                    <div class="shadow mb-3 bg-body rounded"  v-if="this.add==true">
                        <div class="col-md-12">
                          <!--form thêm-->
                         
                          <FormLoaiHang 
                            :loaihang="loaihang"
                            :mode="mode"
                            @submit:loaihang="createloaihang"
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
  import LoaiHangList from "@/components/LoaiHangList.vue";
  import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
  import loaihangService from "@/services/loaihang.service";
  import hanghoaService from "@/services/hanghoa.service";
  import FormLoaiHang from "@/components/FormThemLoaiHang.vue"
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      InputSearchAdmin,
      LoaiHangList,
      FormLoaiHang
      
    },
    props: ["session_admin"],
    data() {
            return {
                listloaihang: [],
                activeIndex: -1,  // vị trí liên hệ đang được chọn
                searchText: "",
                add: false,
                loaihang: null,
                mode: "create"
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
            loaihangtrings() {
                return this.listloaihang.map((loaihang) => {
                     const {tenloai } = loaihang;
                    return [tenloai].join("");
                });
            },
            filteredloaihang() {
               
                    if (!this.searchText) return this.listloaihang;
                    const searchTextLower = this.searchText.toLowerCase();
                    console.log("Search Text:", searchTextLower);
                   
                    return this.listloaihang.filter((_loaihang, index) =>
                    this.loaihangtrings[index].toLowerCase().includes(searchTextLower)
                    );
                },
            activeloaihang() { // liên hệ đang được chọn kiểm tra
                if (this.activeIndex < 0) return null;
             //   alert(this.activeIndex);
                this.add = false;
                this.mode = 'edit'; 
             //   alert(this.filteredloaihang[this.activeIndex].tenloai);
                this.loaihang = this.filteredloaihang[this.activeIndex];
                return this.filteredloaihang[this.activeIndex];
            },
            filteredloaihangCount() {
               return this.filteredloaihang.length; //sl các liên hệ khi tìm kiếm
            },
            },
        methods: {
          async getloaihang(){
              try{
                this.listloaihang = await loaihangService.getAll();
           
              }catch(e){
                console.log(e);
                alert("loi thu lai");
                this.$router.push("/DanhSachLoaiHAng");
              }
      },
      refreshList() {
                // làm mới danh sách
                // bỏ chọn
                this.getloaihang();
                this.activeIndex = -1;
        },
        async removeAllloaihang() {
                // xoá tất cả liên hệ
                if (confirm("Bạn muốn xóa tất cả loại hàng?")) {
                    try {
                      console.log("Gọi xoá tất cả");
                      const resu = await loaihangService.deleteAll();
                      console.log(resu==null);
                      // gọi update idloai hàng của hàng hoá
                     // lặp qua các loại hàng
                     this.listloaihang.forEach(async (loaihang) => {
                        // update sản phẩm loại hàng id loại = ''
                        const listsanpham = await hanghoaService.getALLSanPhamTheoLoai(loaihang._id); // danh sách sản phẩm
                        listsanpham.forEach(async (sanpham) => {
                            const update = {
                                idloai: ''
                            }
                            // gọi 
                            console.log('id loai' , update.idloai);
                            const resu = await hanghoaService.update(sanpham._id, update);
                        });
                     });
                      alert("Đã xoá");
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        async deleteloaihang(loaihang) {  // ham cho phuong thuc delete
                    try {
                      console.log(loaihang._id);
                     const re =  await loaihangService.delete(loaihang._id);
                     console.log('Đã gọi xoá loại hàng');
                      // update sản phẩm loại hàng id loại = ''
                       const listsanpham = await hanghoaService.getALLSanPhamTheoLoai(loaihang._id); // danh sách sản phẩm
                        listsanpham.forEach(async (sanpham) => {
                            const update = {
                                idloai: ''
                            }
                            // gọi 
                            console.log('id loai' , update.idloai);
                            const resu = await hanghoaService.update(sanpham._id, update);
                        });
                 
                    alert('Đã xoá');
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                
               
            },
            async deleteloaihangForm(loaihang) {  // ham cho phuong thuc delete
                if(confirm('Bạn có chắc muốn xoá loại hàng này?')){   
                try {
                      console.log(loaihang._id);
                     const re =  await loaihangService.delete(loaihang._id);
                     console.log('Đã gọi xoá loại hàng');
                      // update sản phẩm loại hàng id loại = ''
                       const listsanpham = await hanghoaService.getALLSanPhamTheoLoai(loaihang._id); // danh sách sản phẩm
                        listsanpham.forEach(async (sanpham) => {
                            const update = {
                                idloai: ''
                            }
                            // gọi 
                            console.log('id loai' , update.idloai);
                            const resu = await hanghoaService.update(sanpham._id, update);
                        });
                 
                    alert('Đã xoá');
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
               
            },
           async updateloaihang(loaihang) {
                try{
                    const resu = await loaihangService.update(loaihang._id, loaihang);
                    alert("update thành công");
                    // gọi reload lại 
                    this.refreshList();
                }catch(e){
                    console.log("Lỗi update " + e);
                }
            },
            async createloaihang(loaihang) {
                try{
                    const resu = await loaihangService.create(loaihang);

                    alert("thêm thành công");
                    this.add = false;
                   this.loaihang = null;
                    // gọi reload lại 
                    this.refreshList();
                }catch(e){
                    console.log("Lỗi thêm " + e);
                }
            
            },
            goToAddnhanvien(){
                this.add = true;
                this.mode='create';
                this.loaihang=null;
                this.activeIndex = -1;
            }
        },
        mounted() {
                this.refreshList(); // gọi làm mới danh sách khi trang được tải
            },
        beforeMount(){
          if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==4 || this.session_admin.quyen==3)){
            alert('Bạn không có quyền truy cập vào quản lý loại hàng của cửa hàng');
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
  