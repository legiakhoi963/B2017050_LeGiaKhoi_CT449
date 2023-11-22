<template>
    <div>
      <AppHeader :session_user="session_user" />
  
      <main>
        <div class="row m-0 p-0" id="tabledathang">
            <div class="col-12 m-0 p-0">
                    <table class="table table-hover shadow-lg rounded m-0 p-0">
                        <thead>
                            <tr>
                                <th scope="col">Ngày đặt</th>
                                <th scope="col">Ngày giao</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Tổng Tiền</th>
                                <th scope="col">Tình trạng</th>
                                <th scope="col">Xem Chi tiết</th>
                                <th scope="col">Huỷ Đơn</th>
                            </tr>
                        </thead>
                        <tbody  v-for="dathang in this.listdathang" :key="dathang._id">
                            <tr>
                                <td class=" pt-3">
                                    <div class="col p-0">
                                      {{dathang.ngaydat}}
                                    </div>
                                </td>
                                <td class="pt-3" v-if="dathang.tinhtrang=='Chờ xác nhận'"> 
                                  <div class="col">
                                    {{dathang.ngaygiao}} <br/> (Dự Kiến)
                                  </div>
                                </td>
                                <td class="pt-3" v-else> 
                                  <div class="col">
                                    {{dathang.ngaygiao}}
                                  </div>
                                </td>
                                <td class="pt-3"> {{dathang.diachigiao}}</td>
                                <!-- tang giam sl -->
                                <td class="pt-3">
                                  {{formattedGia(dathang.tongtien)}}
                                  
                                </td>
                                <!-- thung rac -->
                                
                                <!-- tong tien -->
                                <td class=" pt-3">
                                  {{dathang.tinhtrang}}
                                </td>
                                <td class="pt-3">
                                  
                                      <!--chuyển trang qua chi tiết đơn hàng-->
                                      <routerLink
                                       :to="{ name: 'ChiTietDonHang', query: { id: dathang._id }}"
                                       class="thanhtoan-router" v-if="dathang.tinhtrang!='Đã huỷ'"><i class="fa-solid fa-circle-info icon-chitiet"></i>
                                      </routerLink>

                                      <i class="fa-solid fa-circle-info icon-chitiet-huy" v-else></i>
                                    
                                </td>
                                <td class="pt-3">
                                 <!--Chờ xác nhận thì cho huỷ-->
                                <div v-if="dathang.tinhtrang == 'Chờ xác nhận'">
                                     
                                  <i class="fa-solid fa-trash icon-xoa" data-bs-toggle="modal" data-bs-target="#delete-confirm1"></i>
                                        <div class="modal fade" id="delete-confirm1" tabindex="-1" aria-labelledby="delete-confirm1Label" aria-hidden="true">
                                            <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-body">
                                                                <h5><b>Bạn có chắc muốn huỷ đơn này?</b></h5>
                                                                      </div>
                                                            <div class="modal-footer">
                                                               <button  class="btn btn-xs btn-danger" data-bs-dismiss="modal" @click="huyDon(dathang._id)">Delete</button>
                                                  <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                                                 <!--xử lý xoá-->
                                                 
                                                 
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                      
                
                                    </div>
                                    <!--Còn lại thì không cho huỷ-->
                                    <i v-else class="fa-solid fa-trash icon-xoa-disable"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
               
            </div>
        </div>

        <!-- =====================================end MUA HANG ============================================== -->
    </main> 
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import dathangService from "@/services/dathang.service";
  import hanghoaService from "@/services/hanghoa.service";
  import chitietdathangService from "@/services/chitietdathang.service";
  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    props: ["session_user"],
    data(){
      return {
        listdathang: [],
        message: null,
      }
    },
    methods: {
      async getSPdathang(){
      const idkhachhang = this.$route.query.id;
      try{
      if(idkhachhang!=null){
          this.listdathang = await dathangService.getALLIdKhachhang(idkhachhang);
      }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
    }
    },
    async huyDon (iddathang){
      try{
        const data = {
          tinhtrang: 'Đã huỷ'
        }
        console.log('Gọi huỷ đơn');
        // khách huỷ đơn khi hàng chưa đóng gói thì sản phẩm sẽ được tự cập nhật
         const resu = await dathangService.update(iddathang,data);
         //danh sach chi tiet don hang
        const listspdonhang =  await chitietdathangService.getALLIdDatHang(iddathang);
        if(listspdonhang){ // tồn tại sản phẩm trong đặt hàng
        listspdonhang.forEach(async (donhang) => {  // lặp qua các chi tiết 
          // lấy thông tin sản phẩm
           const sanpham = await hanghoaService.getById(donhang.idhanghoa);
           if (sanpham) { // tồn tại sản phẩm
             // gọi update số lượng
             const sl = sanpham.soluong + donhang.soluong;
             const updatesp = {
              soluong: sl
             }
             console.log('Tồn kho ' + sanpham.soluong);
             console.log("so lượng đơn đặt " + donhang.soluong);
             console.log("số lượng update " +sl);
             const resu = await hanghoaService.update(sanpham._id,updatesp);

           } 
        });
      
      }

         this.getSPdathang();
         this.$router.push({   name: 'DonHang',
                query: {id: this.$route.query.id} });
         
        
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }

    },
    formattedGia(gia) {
            if (gia) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(gia);
            }
            return "0 VND";
        },
    setMessage(message, dathang) {
      dathang.message = message;
      setTimeout(() => {
        dathang.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
    },
    async created() {
      this.getSPdathang();
  },
  mounted(){
    this.getSPdathang();
  }
  };
  </script>
  <style>
  .text-error{
      color: rgb(215, 78, 78);
  }
  
.icon-xoa{
    font-size: 1.2rem;
    text-align: center;
    color: rgb(215, 78, 78);
    cursor: pointer;
  }
.icon-xoa-disable{
  font-size: 1.2rem;
    text-align: center;
    color: rgb(107, 107, 107);
}
.icon-chitiet{
     font-size: 1.5rem;
    text-align: center;
    color: #659fa5;
    cursor: pointer;
  }
.icon-chitiet-huy{
  font-size: 1.5rem;
    text-align: center;
    color: rgb(107, 107, 107);
}
  .text-dathang{
    font-size: 3rem;
   color: #659fa5;
  }
  #tabledathang{

  }
  #tabledathang td, th{
    text-align: center;
  }
  .table_thanhtoan{
    padding-top: 1rem;
    background-color: white;
    border: 1px black;
  }
  .thanhtoan-router{
    text-decoration: none;
  }
  .cart {
    font-size: 2.5rem;
  }
  </style>