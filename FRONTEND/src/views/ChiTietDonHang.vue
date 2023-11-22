<template>
    <div>
      <AppHeader :session_user="session_user" />
      <main>

  <div class="row thongtinsanpham">    
    <div class="col-8 mt-3 ">
          <div class="shadow mb-2 p-3 bg-body rounded">
            <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Thông tin Sản Phẩm Đặt Hàng</h5>
                            <hr>
                        </div>
              <table class="table  mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Đơn Giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody v-for="chitietdonhang in this.listspdonhang" :key="chitietdonhang._id">
                            <tr>
                                <td class=" pt-3">
                                    <div class="col-6 p-0 text-center">
                                        <img v-if="chitietdonhang.linkanh" :src="chitietdonhang.linkanh" alt="loi"
                                            style="height: 5rem;width: 5rem; object-fit: cover">
                                    </div>
                                </td>
                                <td class="pt-3"> 
                                  {{chitietdonhang.tenhh}}
                                </td>
                                <td class="pt-3">{{formattedGia(chitietdonhang.gia)}}</td>
                               
                                <td class="pt-3">{{chitietdonhang.soluong}}
                                </td>
                               
                             
                               <td class=" pt-3">
                                  {{formattedGia(chitietdonhang.soluong*chitietdonhang.gia)}}
                                </td>
                               
                            </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                           
                            <td colspan="2" class="tongtien" >
                             <h5>Tổng Thành Tiền:</h5> 
                            </td>
                            <td>
                              <h5>{{formattedGia(this.tongsotien)}}</h5>
                              
                            </td>
                          </tr>

                        </tfoot>
                    </table>
                </div>
                <div class="shadow p-3 mb-5 bg-body rounded col-8">
                    <div class="row m-4 " v-if="this.dondathang">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-file-invoice"></i></span> Tổng Tiền Đơn Hàng</h5>
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
                                    <p id="phiship">{{formattedGia(this.dondathang.phigiao)}}</p>
                                </div>
                                <div class="col-9 float-sm-start">
                                    <b>Phí giảm giá: </b>
                                </div>
                                <div class="col-3 float-sm-end">
                                    <p>{{formattedGia(this.dondathang.phigiamgia)}}</p>
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
                               
                                <h5><span id="tongtien">{{formattedGia(this.dondathang.tongtien)}}</span></h5>

                            </div>
                     
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-4 mt-3">
              <div>
                <div class="shadow p-3 mb-5 bg-body rounded">
                    <div class="row p-4 " v-if="this.user">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-location-dot"></i></span> Thông Tin Đơn Hàng</h5>
                            <hr>
                        </div>
                        <div class="col-md-12 mt-3">
                          <b>Người nhận :</b> {{this.user.hoten}}
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
                        
                          <b>Ngày đặt hàng :</b>
                            {{this.dondathang.ngaydat}}
                        </div>
                        <div class="col-md-12 mt-3">
                          <b v-if="this.dondathang.tinhtrang=='Chờ xác nhận'">Dự kiến giao hàng :</b>
                          <b v-else>Ngày giao hàng :</b>
                            {{this.dondathang.ngaygiao}}
                        </div>

                        <div class="col-md-12 mt-3">
                            <b>
                            Địa chỉ nhận hàng: 
                          </b>
                         {{this.dondathang.diachigiao}}
                        
                        </div>
                        <div class="col-md-12 mt-3">
                            <b>
                            Tình trạng đơn hàng: 
                          </b>
                         {{this.dondathang.tinhtrang}}
                        
                        </div>
                    </div>
                </div>

              </div>
               
               
            </div>
        </div> 
    </main> 
  
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import hanghoaService from "@/services/hanghoa.service";
  import hinhanhService from "@/services/hinhanh.service";
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
        listspdonhang: [],
        tongsotien: 0,
        user: null,
        dondathang: null,
        
      }
    },
    methods: {
     
    async getSPdonhang(){
      const iddonhang = this.$route.query.id;
   
      this.tongsotien=0;
      try{
        this.dondathang = await dathangService.getById(iddonhang);
       
        this.user = await khachhangService.getById(this.dondathang.idkhachhang);
          this.listspdonhang =  await chitietdathangService.getALLIdDatHang(this.dondathang._id);
        if(this.listspdonhang){
        this.listspdonhang.forEach(async (donhang) => {
           this.tongsotien = this.tongsotien + (donhang.soluong*donhang.gia);
           const hinhanh = await hinhanhService.getHinhAnhSanPham(donhang.idhanghoa);
           const sanpham = await hanghoaService.getById(donhang.idhanghoa);
           if (hinhanh.length > 0 && sanpham) {
             donhang.linkanh = hinhanh[0].linkanh;
             donhang.tenhh = sanpham.tenhh;
           } else {
             donhang.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
             donhang.tenhh = '';
           }
        });
      
      }}
      catch(e){
        console.log(e);
        
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
   
    },
async created() {
   this.getSPdonhang();
   
  },
}
</script>
  <style scoped>
  #hdsd{
    margin-top: 3rem;
}
.thongtinsanpham{
  margin-left: 2rem;
}

.tongtien {
  text-align: left;
 
  font-weight: 700;
  
}
.routelink {
  text-decoration: none;
  color: #000;
  align-items: center;
  margin-top: -0.7rem;
  }
.table td ,img {
  text-align: center;
}
</style>
