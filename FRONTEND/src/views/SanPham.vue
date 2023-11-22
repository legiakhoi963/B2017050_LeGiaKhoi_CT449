<template>
    <div>
      <AppHeader :session_user="session_user" />
     <main>
        <section class="container">
		
        </section>
        <!-- phan cach -->
        <div class="container" id="phancach">
            <div id="pchr">
                <hr style="width: 5rem;flex-grow: 1; font-weight: bold; height: 3px;">
            </div>
            <p class="tenloai" v-if="loaihang">{{loaihang.tenloai}}</p>
            <div id="pchr">
                <hr style="width: 5rem;flex-grow: 1; font-weight: bold; height: 3px;">
            </div>
        </div>
        <!-- san pham -->
        <section class="container">
            <div class="row mb-5 st1" >
                <!--     load du lieu san pham      -->
                    <div class="col-lg-3 col-md-6 mt-3 mb-5" v-for="(sanpham, index) in listsanpham" :key="sanpham._id">
                      <div class="card" style="width: 16rem; ">
                      <img v-if="sanpham.linkanh" :src="sanpham.linkanh" class="card-img-top" alt="SanPham" id="anhsp">
                      <div class="card-body">
                        <h5 class="overflow-hidden">{{sanpham.tenhh}}</h5>
                        <p class="card-text d-flex justify-content-center">{{ formattedGia(sanpham.gia) }}</p>
                        <hr class="hidden_e">
                        <div class="row">
                          <div class="col-6">
                            <router-link
                              :to="{
                                name: 'sanphamchitiet',
                                params: {id: sanpham._id },
                              }"
                              class="hidden_e card-link iconsp"
                            >
                              <i class="fa-solid fa-eye"></i> Xem sản phẩm
                            </router-link>
                          </div>
                          <div class="col-6">
                            <a  class="hidden_e card-link iconsp themgiohang" @click="themgiohang(sanpham)"><i class="fa-solid fa-shopping-cart"></i> Thêm vào giỏ hàng</a>
                            <div v-if="isOutOfStock(sanpham.soluong)" class="out-of-stock-label">Hết hàng</div>
                          </div>
                          <div class="col-12 text-message">
                            {{sanpham.message}}

                          </div>
                        </div>
                  </div>
              </div>

                </div>


                <!-- end -->
            </div>
        </section>
    </main>
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import hanghoaService from "../services/hanghoa.service";
  import hinhanhService from "../services/hinhanh.service";
  import loaihangService from "../services/loaihang.service";
  import giohangService from "@/services/giohang.service";
  export default {
    components: {
      AppHeader,
      AppFooter,
    },
    watch: {
      $route: ["getSanPham", "getLoaiHang"], // Theo dõi thay đổi đường dẫn và gọi getSanPham khi thay đổi
  },
   
    data() {
      return {
        listsanpham: [],
        loaihang: null
      };
    },
    computed: {
     
  },
    props: ["session_user"],
    methods: { 
      isOutOfStock(soluong) {
  
      return soluong == 0;
   // Default to false if this.sanpham is null
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
      async getLoaiHang () {
        const id = this.$route.params.id;
        try{
          this.loaihang = await loaihangService.getById(id);
          console.log('get loai hang');
        }catch(e){
          console.log(e);
          alert("loi thu lai");
          this.$router.push("/");

        }
      },
      async getSanPham(){
        const id = this.$route.params.id;
        console.log(id);
        try{
           this.listsanpham = await hanghoaService.getALLSanPhamTheoLoai(id);
           this.listsanpham.forEach(async (sanpham) => {
            sanpham.message = '';
        const hinhanh = await hinhanhService.getHinhAnhSanPham(sanpham._id);
        if (hinhanh.length > 0) {
          sanpham.linkanh = hinhanh[0].linkanh;
          
         
        } else {
          sanpham.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
        }
      });
        }catch(e){
          console.log(e);
          alert("loi thu lai");
          this.$router.push("/");

        }
      },
      async themgiohang(sanpham)  {
        try{
        if(this.session_user==null || (this.session_user && this.session_user.id == null)){
          alert("Vui lòng đăng nhập tài khoản của bạn")
          this.$router.push({ name: 'DangNhap' });
        }
        else{
            const document = await giohangService.getByIdKhacHangVaIdSP(this.session_user.id, sanpham._id);
            
          if(document && ((document.soluong + 1) > sanpham.soluong)){
            // sản phẩm trong giỏ hàng đã đạt tối đa
                sanpham.message="Số lượng sản phẩm trong giỏ hàng đã đạt tối đa."
                // không cho phép tổng sản phẩm trong giỏ hàng > tồn kho
          }
          
          else{
            const data = {
              idkhachhang: this.session_user.id,
              idhanghoa: sanpham._id,
              soluong: 1,
              gia: sanpham.gia
            }
            const result = await giohangService.create(data);
                // thêm và update số lượng sản phẩm trong giỏ hàng;
                //alert('Thêm giỏ hàng thành công');
              this.setMessage("Đã thêm vào giỏ hàng", sanpham);
          }
    }
  }
    catch(error){
      console.log(error);
    }
  },
  setMessage(message, sanpham) {
      sanpham.message = message;
      setTimeout(() => {
        sanpham.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
    },
    async created() {
      this.getLoaiHang();
    this.getSanPham();
    
  },
}
  
  </script>
<style>
/* section dau index */
.text-message{
  color: red;
}
.themgiohang {
  cursor: pointer;
}
section{
  margin-top: 1.5rem;
}
.st1 h2{
  color:  #24696a;
  margin: 0.5rem;
}
.st1 h5{
  color: black;
  /* margin-top: 0.7rem; */
  font-size: 1rem;
}
.st1 .st1border{
   padding: 1rem;
   
}
#phancach {
  display: flex;
  align-items: center;
  justify-content: center;
  
}

#phancach .tenloai{
 padding: 0 1rem;
 color: black;
 font-weight: 5rem;
 font-weight: bolder;
 font-size: 2rem;
  
}
/* card san pham */
.card #anhsp {
  display: block;
  max-width: 100%;
  height: 17rem;
  object-fit: cover;
  transition: all .3s ;
}


.card{
  position: relative;
  overflow: hidden;

}
.card-text{
  font-weight: bold;
}
.hidden_e{
  
  display: none;
  text-decoration: none;
  color: #24696a;
}
.card:hover .hidden_e{
 
    display: block;
}
.iconsp{
  color: #24696a;
}

.out-of-stock-label {
  background-color: rgba(0, 0, 0, 0.467); /* Add a semi-transparent black background */
  color: white; /* Text color for "Hết hàng" */
  position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
}
</style>