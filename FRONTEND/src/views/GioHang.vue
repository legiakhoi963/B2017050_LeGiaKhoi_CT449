<template>
    <div>
      <AppHeader :session_user="session_user" />
      <main>

        <div class="row m-0 p-0" id="tablegiohang">
            <div class="col-12 m-0 p-0">
                    <table class="table table-hover shadow-lg rounded">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col tensp">Tên</th>
                                <th scope="col">Đơn Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Thành Tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody v-for="giohang in this.listgiohang" :key="giohang._id">
                            <tr>
                               
                                <td class=" pt-3">
                                    <div class="col-12 p-0">
                                        <img v-if="giohang.linkanh" :src="giohang.linkanh" alt="loi"
                                            style="height: 5rem;width: 5rem; object-fit: cover">
                                    </div>
                                </td>
                                <td class="pt-3 tensp"> 
                                  <div class="col">
                                    {{giohang.tenhh}}
                                  </div>
                                  <div class="col">
                                     (Tồn kho: {{giohang.soluongtonkho}})
                                  </div>
                                  <div class="col text-error">
                                  {{giohang.message}}
                                  </div>
                                </td>
                                <td class="pt-3">{{formattedGia(giohang.gia)}}</td>
                                <!-- tang giam sl -->
                                <td class="pt-3">
                                
                                    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <p @click="giamsoluong(giohang)"  class="btn btn-outline-secondary"><i class="fas fa-minus"></i></p>
                                            <p class="btn btn-outline-secondary">{{giohang.soluong}}</p>
                                            <p @click="tangsoluong(giohang)" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></p>
                                   
                                  
                                  </div>
                               
                                   
                                </td>
                                <!-- thung rac -->
                                
                                <!-- tong tien -->
                                <td class=" pt-3">
                                  {{formattedGia(giohang.soluong*giohang.gia)}}
                                </td>
                                <td class="pt-3">
                                    <div>
                                        <i class=" fa-solid fa-trash icon-xoa" @click="deleteSPGioHang (giohang._id)"></i>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
               
            </div>
            <!-- ===================================== MUA HANGF ============================================== -->

            <div class="col-4 table_thanhtoan offset-8">
                    <table class="table table-light">
                        <tr class="position-relative mt-5">
                            <th scope="col-4">Tổng Tiền (VND) :</th>
                            <th scope="col" class=" text-danger ">
                              {{formattedGia(tongsotien)}} </th>
                        </tr>
                        <tr >
                            <td colspan="2">
                              
                                    <div class="col-12 mt-3 ">
                                      <!--Truyển trang thanh toán-->
                                       <routerLink v-if="this.tongsotien>0"
                                       :to="{ name: 'thanhtoan', query: { id: session_user.id }}"
                                       class="thanhtoan-router"
                                       >  <button 
                                            class="text-center mt-2 text-light form-control bg-danger">
                                           THANH TOÁN
                                        </button>
                                      </routerLink>
                                       <button v-else
                                            class="text-center mt-2 form-control bg-secondary" disabled>
                                           THANH TOÁN
                                        </button>
                                      
                                    </div>
                                   
                                
                            </td>
                        </tr>
                        
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
  import hanghoaService from "@/services/hanghoa.service";
  import hinhanhService from "@/services/hinhanh.service";
  import giohangService from "@/services/giohang.service";
import { RouterLink } from "vue-router";
  export default {
    components: {
    AppHeader,
    AppFooter,
    RouterLink
},
    props: ["session_user"],
    data(){
      return {
        listgiohang: [],
        message: null,
        tongsotien: 0
      }
    },
    methods: {
      async getSPGioHang(){
      const idkhachhang = this.$route.query.id;
      this.tongsotien=0;
      try{
      if(idkhachhang!=null){
          this.listgiohang = await giohangService.getALLSPGioHangKhachHang(idkhachhang);
        if(this.listgiohang){
          this.listgiohang.forEach(async (giohang) => {
          giohang.message = null;
          this.tongsotien = this.tongsotien + (giohang.soluong*giohang.gia);
           const hinhanh = await hinhanhService.getHinhAnhSanPham(giohang.idhanghoa);
           const sanpham = await hanghoaService.getById(giohang.idhanghoa);
           if (hinhanh.length > 0 && sanpham) {
             giohang.linkanh = hinhanh[0].linkanh;
             giohang.tenhh = sanpham.tenhh;
             alert
             giohang.soluongtonkho = sanpham.soluong;
            
           } else {
             giohang.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
             giohang.tenhh = '';
             giohang.soluongtonkho='';
           }
        })
      }
      }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
    }
    },
    async deleteSPGioHang (idgiohang){
      try{
         const resu = await giohangService.delete(idgiohang);
         if(resu){
          this.getSPGioHang();
         }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }

    },
    async giamsoluong(giohang){
      try{
      
        if(giohang.soluong==1){
          this.deleteSPGioHang(giohang._id);
        }
        else if(giohang.soluong>1){
          giohang.soluong = await giohang.soluong - 1;
          const updae = {
            idkhachhang: giohang.idkhachhang,
            idhanghoa: giohang.idhanghoa,
            soluong: giohang.soluong,
            gia: giohang.gia
          }
          const resu = await giohangService.update(giohang._id, updae);
       
          if(resu){
            this.getSPGioHang();
          }
        }
      }catch(e){
        console.log(e);
        alert('Lỗi' + e.response.status);
      }
    },
    async tangsoluong(giohang){
      try{
        if(giohang.soluong >= giohang.soluongtonkho){
        
          this.setMessage("Số lượng trong kho không đủ", giohang)
        }
        else if(giohang.soluong>=1){
          giohang.soluong = await giohang.soluong + 1;
          const updae = {
            idkhachhang: giohang.idkhachhang,
            idhanghoa: giohang.idhanghoa,
            soluong: giohang.soluong,
            gia: giohang.gia
          }
          const resu = await giohangService.update(giohang._id, updae);
          if(resu){
            this.getSPGioHang();
          }
        }
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
    setMessage(message, giohang) {
      giohang.message = message;
      setTimeout(() => {
        giohang.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
    },
    async created() {
      this.getSPGioHang();
  },
   
   
  };
  </script>
  <style scoped>
.text-error{
    color: rgb(215, 78, 78);
}

.icon-xoa{
  color: brown;
  font-size: 1.2rem;
  text-align: center;
}
.text-giohang{
  font-size: 3rem;
 color: #659fa5;
}
#tablegiohang{
  margin-left: 5rem;
  margin-right: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
#tablegiohang td, img{
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
#tablegiohang td.tensp, th.tensp{
  text-align: left;
  margin-left: 5px;
}
</style>

  