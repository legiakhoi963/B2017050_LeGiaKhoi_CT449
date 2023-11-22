<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
  <main class="main-trangchu">
    <section class="container">
            <div class="row m-0 p-0">
                <div class="col-4 tien m-0 p-0">
                    <div class="d-flex align-items-center st1border" >
                        <h3 class="font-weight-semi-bold ">Tổng Doanh Thu <br/>{{formattedGia(this.doanhthu.tongdoanhthu)}}</h3>
                    </div>
                   
                </div>
                <div class="col-4 tien m-0 p-0">
                    <div class="d-flex align-items-center st1border" >
                        <h3 class="font-weight-semi-bold ">Doanh Thu Trong Tháng <br/>{{formattedGia(this.doanhthu.tongdoanhthutrongthang)}}</h3>
                    </div>
                </div>
                <div class="col-4 tien m-0 p-0">
                    <div class="d-flex align-items-center st1border" >
                        <h3 class="font-weight-semi-bold ">Doanh Thu Trong Ngày <br/> {{formattedGia(this.doanhthu.tongdoanhthutrongngay)}}</h3>
                    </div>
                </div>
            </div>
        </section>

  </main>
      <AppFooterAdmin/>
    </div>
  </template>
  
  <script>
  import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
  import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
  import DatHangService from "@/services/dathang.service";

  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
    },
    props: ["session_admin"],
    data (){
        return {
            doanhthu: {
                tongdoanhthu: 0,
                tongdoanhthutrongngay: 0,
                tongdoanhthutrongthang: 0
            }
        }
    },
    methods: {
      
            async getDoanhThu() {
            try {
                const danhSachDatHang = await DatHangService.getAll();
                this.doanhthu.tongdoanhthu = 0;
                this.doanhthu.tongdoanhthutrongngay = 0;
                this.doanhthu.tongdoanhthutrongthang = 0;

                danhSachDatHang.forEach((dathang) => {
                

                if (dathang.tinhtrang !== 'Đã huỷ') {
                    this.doanhthu.tongdoanhthu = this.doanhthu.tongdoanhthu + dathang.tongtien;
                    const ngaydat = dathang.ngaydat;
                    console.log(ngaydat);
                    const dngaydatform = this.convertStringToDate(ngaydat);

                    const ngayHienTai = new Date();
                
                    if (dngaydatform.toDateString() === ngayHienTai.toDateString()) {
                      this.doanhthu.tongdoanhthutrongngay  = this.doanhthu.tongdoanhthutrongngay  + dathang.tongtien;
                   
                    } 
                    if (
                            dngaydatform.getMonth() === ngayHienTai.getMonth() &&
                            dngaydatform.getFullYear() === ngayHienTai.getFullYear()
                            )
                            {
                                this.doanhthu.tongdoanhthutrongthang  = this.doanhthu.tongdoanhthutrongthang  + dathang.tongtien;

                            }
                  
                }
                });
            } catch (e) {
                console.log('Lỗi ' + e);
            }
            }
            ,
        formattedGia(gia) {
            if (gia) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(gia);
            }
            return "0 đ";
        },
        convertStringToDate(dateString) {
         const [day, month, year] = dateString.split('/');
            // Tháng trong JavaScript đếm từ 0, nên giảm giá trị tháng đi 1
         return new Date(year, month - 1, day);
        }
    },
    mounted() {
        this.getDoanhThu();
       
           // this.$store.commit('setSessionUser', null);
       // this.$store.commit('setSessionAdmin', null);
    }
   
  };
  </script>
<style scoped>
.main-trangchu{
    margin-bottom: 10rem;
}
.fa-2x {
  font-size: 2em;
  color: #539590;
}
.tien h2{
    margin-bottom: 1rem;
}
</style>
  