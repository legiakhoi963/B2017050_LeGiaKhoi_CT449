

<template>
<header class="p-0">
<nav id="menu" class="navbar navbar-expand-lg p-2 bg-success">
<div class="container-fluid p-0">
    <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0">
      <li class="nav-item btn btn-warning m-2 p-0">
        <router-link :to="{ name: 'trangchu' }" class="nav-link">Trang Chủ
        </router-link>
        </li>
		
        <li class="nav-item btn btn-light m-2 p-0" v-if="session_user==null">
          <router-link 
            :to="{
                name: 'DangNhap',
            }"
           class="nav-link"
        >
        Đăng Nhập
        </router-link>
        </li>
		
        <li class="nav-item btn btn-light m-2 p-0" v-if="session_user==null">
          <router-link 
            :to="{
                name: 'DangKy',
            }"
           class="nav-link"
        >
        Đăng Ký
        </router-link>
        </li>
		
		<li class="nav-item btn btn-light m-2 p-0" v-if="session_user==null">
          <router-link 
            :to="{
                name: 'admin',
            }"
           class="nav-link"
        >
        Admin
        </router-link>
        </li>
		
        <li class="nav-item btn btn-warning m-2 p-0" v-if="this.user!=null &&this.session_user && this.session_user.id!=null">
          <router-link 
            :to="{
                name: 'DonHang',
                query: {id: session_user.id}
            }"
           class="nav-link"
        >
        Đơn Hàng
        </router-link>
        </li>
      </ul>
    </div>
    <!---Tìm kiếm Form-->
   <div class="col-3">
    <InputSearch></InputSearch>
   </div> 
   
    <router-link v-if="this.session_user && this.session_user.id!=null && this.user!=null"
            :to="{
                name: 'GioHang',
                query: { id: session_user.id }
            }"
           
           class="nav-link"
        ><i class="fa fa-cart-shopping icon-cart"></i>
        </router-link>
        <router-link v-else
            :to="{
                name: 'GioHang',
               
            }"
           
           class="nav-link"
        ><i class="fa fa-cart-shopping icon-cart"></i>
        </router-link>
      <ul class="navbar-nav" id="nguoidung" v-if="this.user!=null && session_user!=null && session_user.id!=null">
        <li class="nav-item dropdown danhsachnguoidung btn btn-warning m-2 p-0">
        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton1" aria-expanded="false">
          {{this.user.hoten}}
        </a>
            <div class="dropdown-menu container danhsach"  aria-labelledby="dropdownMenuButton1">

              <router-link 
            :to="{
                name: 'CaNhan',
                params:{
                 id: session_user.id
                }
            }"
           class="dropdown-item"
        >
        Trang Cá Nhân
        </router-link>
               <a class="dropdown-item dangxuat" @click="logout">Đăng xuất</a>
            </div>
      </li>
	  
        </ul>
        <div>
   
  
  </div>

</div>

</nav>
</header>
</template>
<style scoped>
       @import "@/assets/stype.css"; 
</style>

<script>
import InputSearch from '@/components/InputSearch.vue';
import loaihangService from "@/services/loaihang.service";
import khachhangService from "@/services/khachhang.service";
export default {
  components: {
    InputSearch
  },
 props: ["session_user"],
  data() {
    return {
      loaihang: [],
      user: null,
    };
  },
  computed: {
    loaihangStrings() {
                return this.loaihang.map((loai) => {
                     const {tenloai } = loai;
                    return [tenloai].join("");
                });
            },
    filteredLoaiCho() {
      return this.loaihang.filter((_loai,index) => this.loaihangStrings[index].includes('chó'));
    },
    filteredLoaiMeo() {
      return this.loaihang.filter((_loai,index) => this.loaihangStrings[index].includes('mèo'));
    },
    
  },
  
  methods: {
    async logout() {
    try{
    const document =  await khachhangService.logout();
    this.$store.commit('setSessionUser', document.token);
     this.user=document.token;
    this.$router.push({ path: "/" });
  }
  catch(e){
    console.log('Lỗi'+e);
  }
    
  },

  async getUser() {
    if(this.session_user && this.session_user.id!=null){
                try {
                    // lấy danh sách các loại hàng
                  this.user = await khachhangService.getById(this.session_user.id);
                  if(this.user==null){  // thông tin khách hàng đã bị xoá;
                    this.$store.commit('setSessionUser', null);
                    this.$router.push({ path: "/" });
                  }
                 
                } catch (error) {
                    console.log(error);
                }
    }
  },
  async getALLLoaiHang() {
   
                try {
                    // lấy danh sách các loại hàng
                  this.loaihang = await loaihangService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
},
  mounted(){
        this.getUser();
        this.getALLLoaiHang(); // gọi khi trang vừa được load
            }
      }
</script>