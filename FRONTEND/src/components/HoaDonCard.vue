

<template>
    <div class="row p-4 text-success text-left">
            <h3 class="col-4">Chi tiết hoá đơn</h3>
            <div class="hieuchinh col-6 text-success">
                       <!-- <router-link id="route-link" style="text-decoration: none; color: #2b7778;"
                                :to="{ name: 'editsanpham', params: { id: activeHangHoa._id } }"
                                >
                            <i class="fas fa-edit"></i> Chỉnh sửa
                        </router-link> -->
                        <div class="row mb-3">
                            <button class="btn btn-sm btn-primary col-3 m-2" @click="updateHoaDon('Đã xác nhận')" v-if="this.dondathang && this.xacnhan==true">
                            Xác nhận đơn
                        </button>
                        <button class="btn btn-sm btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#delete-confirm2" v-if="this.dondathang && this.huydon==true">
                            Huỷ đơn
                        </button>
                        <div class="modal fade" id="delete-confirm2" tabindex="-1" aria-labelledby="delete-confirm2Label" aria-hidden="true">
                                            <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-body">
                                                                <h5><b>Bạn có chắc muốn huỷ đơn này?</b></h5>
                                                                      </div>
                                                            <div class="modal-footer">
                                                              <button  class="btn btn-xs btn-danger" data-bs-dismiss="modal" @click="updateHoaDon('Đã huỷ')">OK</button>
                                                  <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                                                 <!--xử lý xoá-->
                                                
                                                 
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                        <button class="btn btn-sm btn-danger col-3 m-2" data-bs-toggle="modal" data-bs-target="#delete-confirm1" v-if="this.dondathang && this.xoa==true">
                            xoá
                        </button>
                        <div class="modal fade" id="delete-confirm1" tabindex="-1" aria-labelledby="delete-confirm1Label" aria-hidden="true">
                                            <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-body">
                                                                <h5><b>Bạn có chắc muốn xoá đơn này?</b></h5>
                                                                      </div>
                                                            <div class="modal-footer">
                                                              <button  class="btn btn-xs btn-danger" data-bs-dismiss="modal" @click="deleteHoaDon()">Delete</button>
                                                  <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                                                 <!--xử lý xoá-->
                                                  
                                                 
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                        <button class="btn btn-sm btn-primary col-3 m-2" v-if="this.dondathang && this.capnhat==true" @click="updateHoaDon(this.dondathang.tinhtrang)">
                            cập nhật
                        </button>
                        </div>
                      
                     </div> 
                  <hr>
                      </div>
                      <div class="col-md-12">
                        <div class="row thongtinsanpham">    
                <div class="shadow p-1 mb-5 bg-body rounded col-12">
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
                            <div class="col-9 float-sm-start">
                              <h5> <b>Tổng Thanh toán: </b></h5>
                               
                            </div>
                            <div class="col-3 float-sm-end text-danger">
                               
                                <h5><span id="tongtien">{{formattedGia(this.dondathang.tongtien)}}</span></h5>

                            </div>
                     
                        </div>
                    </div>
                </div>
        <div class="col-12">
              <div>
                <div class="shadow p-2 mb-5 bg-body rounded">
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
                        <div class="col-md-12 mt-3" v-if="this.xoa==false">
                          <b v-if="this.dondathang.tinhtrang=='Chờ xác nhận'">Dự kiến giao hàng:   </b>
                          <b v-else>Ngày giao hàng:   </b>
                          <input
                            name="ngaysanxuat"
                            type="date"
                            class="col-4"
                            v-model="this.dondathang.ngaygiao"
                            />
                          <!--  {{this.dondathang.ngaygiao}}-->
                        </div>
                        <div class="col-md-12 mt-3" v-else>
                          <b v-if="this.dondathang.tinhtrang=='Chờ xác nhận'">Dự kiến giao hàng:   </b>
                          <b v-else>Ngày giao hàng:   </b>
                          {{this.dondathang.ngaygiao}}
                        </div>

                        <div class="col-md-12 mt-3">
                            <b>
                            Địa chỉ nhận hàng: 
                          </b>
                         {{this.dondathang.diachigiao}}
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.capnhat">
                            <b>
                            Tình trạng đơn hàng: 
                          </b>
                       
                         <select 
                            name="tinhtrang"
                            class="col-4"
                            v-model="this.dondathang.tinhtrang"
                            
                        >
                                <option v-if="this.dondathang.tinhtrang!=''" selected>{{this.dondathang.tinhtrang}}</option>
                                <option v-if="this.dondathang.tinhtrang!='Đã xác nhận'">Đã xác nhận</option>
                                    <option v-if="this.dondathang.tinhtrang!='Đang giao'">Đang giao</option>
                                    <option v-if="this.dondathang.tinhtrang!='Đã nhận hàng'">Đã nhận hàng</option>
                                    <option v-if="this.dondathang.tinhtrang!='Đã huỷ'">Đã huỷ</option>
                        
                            <!-- Thêm các loại hàng khác nếu cần -->
                        </select>
                        
                        </div>
                        <div class="col-md-12 mt-3 text-danger" v-else-if="this.dondathang.tinhtrang=='Đã huỷ'">
                            <b class="text-dark">
                            Tình trạng đơn hàng: 
                          </b>
                         {{this.dondathang.tinhtrang}}
                        </div>
                        <div class="col-md-12 mt-3" v-else>
                            <b>
                            Tình trạng đơn hàng: 
                          </b>
                         {{this.dondathang.tinhtrang}}
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.dondathang.idnhanvien!=''">
                            <b>
                            Nhân viên: 
                          </b>
                         {{this.dondathang.tennhanvien}}
                        </div>
                    </div>
                </div>

              </div>
               
               
            </div>
             <div class="shadow mb-2 p-3 rounded">
            <div class="col-md-6 text-success">
                            <h5> <span><i class="fa-solid fa-cart-shopping"></i></span> Thông tin Sản Phẩm Đặt Hàng</h5>
                            <hr>
                        </div>
              <table class="table mt-4">
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
                                    <div class="col-6 p-0">
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
            </div>
                      </div>

</template>
<script>
  import hanghoaService from "@/services/hanghoa.service";
  import hinhanhService from "@/services/hinhanh.service";
  import khachhangService from "@/services/khachhang.service";
  import chitietdathangService from "@/services/chitietdathang.service";
   export default {
       props: {
        dondathang: { type: Object, required: true },
        huydon: {type: Boolean},
        xacnhan: {type: Boolean},
        capnhat: {type: Boolean},
        xoa: {type: Boolean},
        idadmin: {type: String}
       },
       data(){
              return {
                listspdonhang: [],
                tongsotien: 0,
                user: null,
                
            }
    },
    emits:['updatehoadon','deletehoadon'],
       methods: {
        async getSPdonhang(){
        this.tongsotien=0;
      try{
          this.listspdonhang =  await chitietdathangService.getALLIdDatHang(this.dondathang._id);
          this.user = await khachhangService.getById(this.dondathang.idkhachhang);
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
        async updateHoaDon(tinhtrang){
            console.log("gọi update");
            this.dondathang.tinhtrang = tinhtrang;
            this.dondathang.idnhanvien = this.idadmin;
            console.log(this.dondathang.tinhtrang);
            console.log(this.dondathang.ngaygiao);
            const ngaygiao = new Date(this.dondathang.ngaygiao)
            const ngaydat = new Date(this.dondathang.ngaydat)
            if(ngaygiao<ngaydat){
              alert('Ngày giao hàng phải lớn hơn hoặc bằng ngày đặt hàng')
            }else{
              this.$emit("updatehoadon", this.dondathang); 
            }
           
            
        },
        async deleteHoaDon(){
            console.log('Gọi xoá');
            this.$emit("deletehoadon", this.dondathang); 
        }
            },
        
        async created() {
        this.getSPdonhang();
        },
   };
</script>
<style scoped>
  #hdsd{
    margin-top: 3rem;
}
.thongtinsanpham{
  margin-left: 1rem;
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