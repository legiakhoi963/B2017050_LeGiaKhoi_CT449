<template>
    <div>
      <AppHeader :session_user="session_user" />
  <main>
        <!-- phan cach -->


        <!-- Chi tiet san pham -->
        <div class="log row m-3 p-0">
            <div class="row pb-2">
                <div class="col-xl-5 col-md-12 mb-3">
                    <div class="img_e" >
                        <img v-if="this.sanphams.linkanh && this.sanphams" :src="this.sanphams.linkanh" alt="Khong load được ảnh"
                            style="width: 30rem; height:30rem">
                    </div>
                </div>
                <div class="col-xl-7 col-md-12">
                    <div class="product_info">
                        <h2>
                            {{this.sanphams.tenhh}}
                        </h2>
                        <h1 class="text-danger">
                            {{formattedGia(this.sanphams.gia)}}
                        </h1>
                        <div class="row">
                            <div class="col-6">
                            
                                <p v-if="this.sanphams.soluong==0" class="text-hethang"> <b>Số lượng còn:</b> {{this.sanphams.soluong}} Hết hàng</p>
                                <p v-else> <b>Số lượng còn:</b> {{this.sanphams.soluong}}</p>
                                <p> <b>Thương hiệu:</b> {{this.sanphams.thuonghieu}} </p>
                            </div>
                            
                           
                        </div>
                        <div class="row">
                                <p><b>Mô tả: </b> {{this.sanphams.mota}}</p>
                                
                            </div>
                        <div id="dialog" title="Basic dialog">
                            <p class="text-success"></p>
                        </div>
                        <!-- ===================================== form thêm giỏ hàng =================================================== -->
                        <FormThemGioHang
                        @submit:themgiohang="submitthemgiohang"
                        :sanpham="sanphams"
                        :soluong="1"
                        :idkhachhang="user_login.id"
                       
                        />
                        <!-- ======================================================================================== -->
                    </div>

                </div>

            </div>
        </div>
        <!-- end chi tiet san pham -->
        <!-- phan cach -->
        <div class="container phancach" >
            <div class="pchr">
                <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 3px;" >
            </div>
            <h3>Sản phẩm tương tự</h3>
            <div class="pchr">
                <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-left: 3px;">
            </div>
        </div>
        <!-- san pham -->
        <section class="container">
            <div class="row st1" >
                <!--     load du lieu san pham      -->
                <div class="col-lg-3 col-md-6 mt-3 mb-5" v-for="(sanpham) in listsanpham.filter(sanpham => sanpham._id !== this.sanphams._id)"
                          :key="sanpham._id">
                    <div class="card" style="width: 16rem; ">
                        <img v-if="sanpham.linkanh" :src="sanpham.linkanh" class="card-img-top " alt="SanPham" id="anhsp">
                        <div class="card-body">
                            <h5 class="overflow-hidden">{{sanpham.tenhh}}</h5>
                            <p class="card-text d-flex justify-content-center">{{ formattedGia(sanpham.gia) }}</p>
                            <hr class="hidden_e">
                            <!--   <a href="detail_product.php" class=" hidden_e card-link "><i class="fa-solid fa-cart-shopping" id="iconsp"></i> Thêm vào giỏ</a> -->
                            <div class="row">
                              <div class="col-6">
                                <router-link 
                                    :to="{
                                        name: 'sanphamchitiet',
                                        params: {id: sanpham._id }, // truyền tham số id với giá trị id của contact đang được chọn vao trang edit-delete
                                    }"
                                    class="hidden_e card-link iconsp "
                                >
                                <i class="fa-solid fa-eye" ></i> Xem sản phẩm
                             </router-link>
                                
                              </div>
                              <div class="col-6">
                                <a href="" class="hidden_e card-link iconsp "><i class="fa-solid fa-shopping-cart"></i> Thêm vào giỏ hàng</a>
                    </div>
                          
                            </div>
                           
                        </div>
                    </div>
                </div>
              
            </div>
        </section>
        <!-- end san pham -->
      

    </main>
      <AppFooter :session_user="session_user" />
    </div>
  </template>
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppFooter from "@/components/AppFooter.vue";
  import hanghoaService from "@/services/hanghoa.service";
  import hinhanhService from "@/services/hinhanh.service";
  import FormThemGioHang from "@/components/FormThemGioHang.vue";
  import giohangService from "@/services/giohang.service";
  export default {
    components: {
      AppHeader,
      AppFooter,
      FormThemGioHang,
    },
    watch: {
      $route: ["getSanPham", "getSanPhamTuongTu"], // Theo dõi thay đổi đường dẫn và gọi getSanPham khi thay đổi
  },
  props: ["session_user"],
    data() {
      return {
        sanphams: null,
        listsanpham: [],
        user_login: this.session_user || {
            id: null,
        },
      };
    },
    computed: {
      async getSanPhamTuongTu() {
      if (this.sanphams) {
        const list = await hanghoaService.getALLSanPhamTheoLoai(this.sanphams.idloai);
        if(list){
        await Promise.all(
          list.map(async (sanpham) => {
            const hinhanh = await hinhanhService.getHinhAnhSanPham(sanpham._id);
            if (hinhanh.length > 0) {
              sanpham.linkanh = hinhanh[0].linkanh;
            } else {
              sanpham.linkanh = ''; // Set a default value if there's no image
            }
          })
        );
      }
        return list;
      } else {
        return [];
      }
    },
    
    },
    methods: {
      formattedGia(gia) {
            if (gia) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(gia);
            }
            return "0 VND";
        },
       
      async getSanPham(){
        const id = this.$route.params.id;
        console.log(id);
        try{
           this.sanphams = await hanghoaService.getById(id);
           if(this.sanphams){
            const hinhanh = await hinhanhService.getHinhAnhSanPham(this.sanphams._id);
                    if (hinhanh.length > 0) {
                        this.sanphams.linkanh = hinhanh[0].linkanh;
                
                } else {
                    this.sanphams.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
                }
           }
        }catch(e){
          console.log(e);
          this.$router.push({ path: "/" });

        }
      },
      async submitthemgiohang (data) {
        //alert(soluong);
      try{ 
        if(this.user_login.id==null){
          alert("Vui lòng đăng nhập tài khoản của bạn")
          this.$router.push({ name: 'DangNhap' });
        }
        else{
          const result = await giohangService.create(data);
          // thêm và update số lượng sản phẩm trong giỏ hàng;
          //alert('Thêm giỏ hàng thành công');
        }
        }catch(error){
       
          console.log(error);
        }
       
      }
      , 
     
     
    },
    async created() {
    await this.getSanPham();
    this.listsanpham = await this.getSanPhamTuongTu;
     },
}
  
  </script>
  <style>

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
  
  
.phancach {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
  
  /* card san pham */
  .card #anhsp {
    display: block;
    height: 17rem;
    max-width: 100%;
    object-fit: cover;
    transition: all .3s ;
  }
  .card #anhsp:hover {
    height: 17rem;
    max-width: 100%;
    object-fit: cover;
    transform: scaleX(1.3);
  }
  .card{
    position: relative;
    overflow: hidden;
  
  }
  .card-text{
    font-weight: bold;
  }
  .hidden_e{
    /* visibility: hidden; 
    opacity: 0; 
    transition: opacity 0.4s ease;  */
    display: none;
    text-decoration: none;
    color: #24696a;
  }
  .card:hover .hidden_e{
    /* visibility: visible;
    opacity: 1; */
      display: block;
  }
  .iconsp{
    color: #24696a;
  }
  .product_info p{
    font-size: 18px;
  }
  .log {
    margin-bottom: 2rem;
    margin-top: 0;
  }
  .log h2{
    font-weight: 900px;
  }
  .text-hethang{
    color: red;
  }
  .text-hethang b{
    color: #000;
  }
  </style>