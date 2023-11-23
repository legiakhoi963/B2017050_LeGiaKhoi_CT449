<template>
    <div>
      <AppHeader :session_user="session_user" />
      <main>
        <form class="row m-0 p-0" @submit.prevent="submitthanhtoan">
            <div class="col-8 m-0 p-0">
                  <!--   <div class="shadow p-3 mb-5 bg-body rounded">
             
                    <div class="row p-4 pt-0" v-if="this.user">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-location-dot"></i></span> Thông Tin Nhận Hàng</h5>
                            <hr>
                        </div>
                        <div class="col-md-6 mt-3">
                          <b>Họ Tên :</b> {{this.user.hoten}}
                        </div>
                        <div class="col-md-6 mt-3">
                          <b>Số điện thoại :</b>
                            {{this.user.sdt}}
                        </div>
                        <div class="col-md-6 mt-3">
                          <label class="form-label">   <b>
                            Địa chỉ nhận hàng: 
                          </b>
                         {{this.dathang.diachigiao}}
                            </label>
                             
                        </div>
                        <div class="col-md-6 mt-3">
                         <b>
                          Phương thức thanh toán : 
                         </b> 
                         Thanh toán khi nhận hàng
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <input type="text" class ="form-control col-6" v-model="this.dathang.diachigiao"  required>
                          </div>
                    </div>
                    </div>
                   
                </div>
             -->
              
          <div class="shadow mb-5 p-3 rounded bg-body">
            <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Thông tin đơn hàng</h5>
                            <hr>
                        </div>
              <table class="table  mt-4 ">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Đơn Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody v-for="giohang in this.listgiohang" :key="giohang._id">
                            <tr>
                                <td class=" pt-3">
                                    <div class="col-6 p-0">
                                        <img v-if="giohang.linkanh" :src="giohang.linkanh" alt="loi"
                                            style="height: 5rem;width: 5rem; object-fit: cover">
                                    </div>
                                </td>
                                <td class="pt-3"> 
                                  {{giohang.tenhh}}
                                </td>
                                <td class="pt-3">{{formattedGia(giohang.gia)}}</td>
                                <!-- tang giam sl -->
                                <td class="pt-3">{{giohang.soluong}}
                                </td>
                               
                                <!-- tong tien -->
                                <td class=" pt-3">
                                  {{formattedGia(giohang.soluong*giohang.gia)}}
                                </td>
                               
                            </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="4" class="tongtien" >
                             <h5>Tổng Tiền</h5> 
                            </td>
                            <td>
                              <h5>{{formattedGia(this.tongsotien)}}</h5>
                              
                            </td>
                          </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- ===================================== END THONG TIN CHI TIẾT ĐON HÀNG ============================================== -->
            </div>
            <div class="col-4 m-0 pt-0 ps-3 pe-0">
              <div>
                <div class="shadow p-3 mb-3 bg-body rounded">
                    <div class="row p-4 pt-0" v-if="this.user">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-location-dot"></i></span> Thông Tin Nhận Hàng</h5>
                            <hr>
                        </div>
                        <div class="col-md-12 mt-3">
                          <b>Họ Tên :</b> {{this.user.hoten}}
                        </div>
                        <div class="col-md-12 mt-3">
                          <b>Số điện thoại :</b>
                            {{this.user.sdt}}
                        </div>

                        <div class="col-md-12 mt-3">
                         <b>
                          Phương thức thanh toán : 
                         </b> 
                         Thanh toán khi nhận hàng
                        </div>
                        <div class="col-md-12 mt-3">
                          <b>Dự kiến giao hàng :</b>
                            {{this.dathang.ngaygiao}}
                        </div>

                        <div class="col-md-12 mt-3">
                          <label class="form-label">   <b>
                            Địa chỉ nhận hàng: 
                          </b>
                         {{this.dathang.diachigiao}}
                            </label>
                             
                        </div>
                      
                        <div class="row">
                          <div class="col-12">
                            <input type="text" class ="form-control col-6" v-model="this.dathang.diachigiao"  required>
                          </div>
                    </div>
                    </div>
                </div>
              </div>
                <div class="shadow p-3 mb-3 bg-body rounded">
                    <div class="row m-2 ">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-file-invoice"></i></span> Chi tiết thanh toán</h5>
                            <hr>
                        </div>
                        <div class="col-md-12 fs-6">
                            <div class="row">
                                <div class="col-9 float-sm-start">
                                    <b>Tổng tiền hàng: </b>
                                </div>
                                <div class="col-3 float-sm-end">
                                    <p><span id="tienhang">{{formattedGia(this.tongsotien)}} </span></p>
                                </div>
                                <div class="col-9 float-sm-start">
                                    <b>Phí vận chuyển: </b>
                                </div>
                                <div class="col-3 float-sm-end">
                                    <p id="phiship">{{formattedGia(this.dathang.phigiao)}}</p>
                                </div>
                                <div class="col-9 float-sm-start">
                                    <b>Phí giảm giá: </b>
                                </div>
                                <div class="col-3 float-sm-end">
                                    <p>{{formattedGia(this.dathang.phigiamgia)}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <hr>
                        </div>
                        <div class="row">
                            <div class="col-9 float-sm-start mb-3">
                              <h5> <b>Tổng Thanh toán: </b></h5>
                               
                            </div>
                            <div class="col-3 float-sm-end text-danger mb-3">
                               
                                <h5><span id="tongtien">{{formattedGia(this.dathang.tongtien)}}</span></h5>

                            </div>
                            <input type="hidden" id="tonghd" name="tonghoadon" value="<?php echo $tongtien?>">
                            <button type="submit" name="sb" class="btn btn-danger">Đặt hàng</button>

                        </div>
                    </div>
                </div>
                <!-- =====================================PHUONG THUC THANH TOÁN ============================================== -->
            </div>
        </form>


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
  import khachhangService from "@/services/khachhang.service";
  import dathangService from "@/services/dathang.service";
  import chitietdathangService from "@/services/chitietdathang.service";
  
  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    props: ["session_user"],
    data(){
      return {
        listgiohang: [],
        tongsotien: 0,
        user: null,
        listchitietdathang:[],
        dathang :  {
          ngaydat: null,
          ngaygiao: null,
          diachigiao: null,
          phigiao: 50000,
          phigiamgia: 0,
          tongtien: 0,
          idkhachhang: null,
          idnhanvien: null,
          tinhtrang: 'Chờ xác nhận',
        }
      }
    },
    methods: {
      async getUser(){
        const idkhachhang = this.$route.query.id;
        try{
             this.user = await khachhangService.getById(idkhachhang);
             console.log("Lấy thông tin khách hàng thành công");
             this.dathang.idkhachhang = this.user._id;
             this.dathang.diachigiao = this.user.diachi;
             console.log("idkhachhang " + this.dathang.idkhachhang);
        }catch(e){
          console.log(e);
         alert('Lỗi' + e.response.status);
        }
      },
      async getSPGioHang(){
      const idkhachhang = this.$route.query.id;
      this.tongsotien=0;
      var i = 0;
      try{
      if(idkhachhang!=null){
          this.listgiohang = await giohangService.getALLSPGioHangKhachHang(idkhachhang);
        if(this.listgiohang){
        
        this.listgiohang.forEach(async (giohang) => {
           this.tongsotien = this.tongsotien + (giohang.soluong*giohang.gia);
           const hinhanh = await hinhanhService.getHinhAnhSanPham(giohang.idhanghoa);
           const sanpham = await hanghoaService.getById(giohang.idhanghoa);
           if (hinhanh.length > 0 && sanpham) {
             giohang.linkanh = hinhanh[0].linkanh;
             giohang.tenhh = sanpham.tenhh;
             giohang.soluongtonkho = sanpham.soluong;
            
           } else {
             giohang.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
             giohang.tenhh = '';
             giohang.soluongtonkho ='';
           }
           console.log(i);
           this.listchitietdathang[i] = {
              iddathang : null,
              idhanghoa: giohang.idhanghoa,
              soluong: giohang.soluong,
              gia: giohang.gia,
              soluongtonkho: giohang.soluongtonkho
           }
           console.log(this.listchitietdathang[i].soluongtonkho);
           i=i+1;
           
        });
      }
      if(this.tongsotien==0) {
        this.dathang.phigiamgia=0;
      }
    else if(this.tongsotien <= 200000){
        this.dathang.phigiamgia=10000;
      }
     else if(this.tongsotien <= 300000){
        this.dathang.phigiamgia=25000;

      }
      else if(this.tongsotien <= 400000){
        this.dathang.phigiamgia=50000;
      }
      else if(this.tongsotien <= 50000){
        this.dathang.phigiamgia=100000;
      }
       this.dathang.tongtien = this.tongsotien + this.dathang.phigiao - this.dathang.phigiamgia;
      }
      console.log("idkhachhang " + this.dathang.tongtien);
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
        async  submitthanhtoan(){
          
            // thêm đặt hàng;
            try{
            const idkhachhang = this.$route.query.id;
            const document = await dathangService.create(this.dathang); // thêm bảng đặt hàng
          
            if(document){
           this.listchitietdathang.forEach(async (chitietdathang)=> {
            chitietdathang.iddathang = await document.insertedId;
            const resu = await chitietdathangService.create(chitietdathang);
             // thêm chi tiết đặt hành thành công
              // xoá giỏ hàng này của khách hàng
              await giohangService.deleteALLSPGioHangKhachHang(idkhachhang);
              // update số lượng các sản phẩm;
              const sanphamupdate = {
                soluong: chitietdathang.soluongtonkho - chitietdathang.soluong
              }
             const spupdate = await hanghoaService.update(chitietdathang.idhanghoa, sanphamupdate);
              // liệt kê tất cả giỏ hàng có id hàng hoá này 
              const listspgiohang = await giohangService.getByIdSP(chitietdathang.idhanghoa);
              if(listspgiohang!=null || listspgiohang!=[]){
              listspgiohang.forEach(async (giohang)=> {
                if(giohang.soluong > (chitietdathang.soluongtonkho - chitietdathang.soluong)){
                     const giohangupdate = {
                      soluong: chitietdathang.soluongtonkho - chitietdathang.soluong,
                     }
                     await giohangService.update(giohang._id, giohangupdate);
                }
                else if((chitietdathang.soluongtonkho - chitietdathang.soluong)==0){
                  await giohangService.delete(giohang._id);
                }
                //update sản phẩm nếu sản phẩm lớn hơn tồn kho thì soluong=tonkho, còn không thì giữ nguyên;
              })
            }
           });
            }
         alert("đặt hàng thành công");

         this.getSPGioHang();
         this.$router.push({   name: 'DonHang',
                query: {id: this.user._id} });
            }catch(e){
              console.log(e);
            alert('Lỗi' + e.response.status);
    
            }
          }
          
   
    },
    async created() {
      this.getSPGioHang();
      this.getUser();
      // Tính toán ngaydat và ngaygiaohang
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);
        deliveryDate.setDate(deliveryDate.getDate() + 6);

      

        this.dathang.ngaydat = currentDate.toLocaleDateString("en-CA");
        this.dathang.ngaygiao = deliveryDate.toLocaleDateString("en-CA");
        console.log(this.dathang.ngaydat);
  },
  };
  </script>
<style scoped>
  #hdsd{
    margin-top: 3rem;
}
.process{
  margin-top: 1.5rem ;
  color: #000;
  font-size: 1.8rem;
}
div.lineprocess{
  position: relative;
  margin: 3px;
  padding: 0;
  width: 5rem;
  border: 3px solid black;
  height: 4px;
}
.process .itemprocess{
  padding-right: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: -0.7rem;
}
.tongtien{
  text-align: right;
  margin-right: 2rem;
  font-weight: 700;
}
.routelink {
  text-decoration: none;
  color: #000;
  align-items: center;
  margin-top: -0.7rem;
  }
</style>