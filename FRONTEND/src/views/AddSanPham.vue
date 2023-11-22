<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="hanghoa==null">

        <!--Trang Form edit/thêm-->
        <FormSanPham
            :hanghoa="hanghoa"
            :mode="mode"
            @submit:hanghoa="createHangHoa"
        /> <!--truyen phuoc thuc cho submit -> tao moi hoac update hoac delete-->
        <p>{{ message }}</p>
    </div>
      </main>
   
      <AppFooterAdmin/>
    </div>
  </template>
  
  <script>
  import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
  import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
  import FormSanPham from "@/components/FormSanPham.vue";
  import hanghoaService from "@/services/hanghoa.service";
 import hinhanhService from "@/services/hinhanh.service";
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      FormSanPham,
    },
    props: ["session_admin"],
    data() {
            return {
                hanghoa: null, // du lieu truyen vao form
                message: "",
                mode:'create', // du lieu truyen vao form
                
            };
        },
        methods: {
            async createHangHoa(data, hinhanhdata, fileupload) {  // ham goi submit
                try {
                 const hoanghoa =   await hanghoaService.create(data);
                 console.log("id hang hao " + hoanghoa.insertedId);
                  // upload ảnh
                    const response = await hinhanhService.upload(hinhanhdata);
                    const imageUrl = response.url;
                    console.log('Link anh ' + imageUrl);
                    const hinhanh = {
                        linkanh: imageUrl,
                        tenanh: fileupload.name,
                        idhanghoa: hoanghoa.insertedId
                     }
                     await hinhanhService.create(hinhanh);
                    this.message = "Thêm thành công";
                    alert(this.message);  // thông báo thành công
                    this.$router.push("/danhsachsanpham"); // chuyển về trang chủ
                } catch (error) {
                    console.log(error);
                }
            },
            
        },
        beforeMount(){
        if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==4 || this.session_admin.quyen==3)){
          alert('Bạn không có quyền truy cập vào quản lý sản phẩm của cửa hàng');
          this.$router.push({ path: "/danhsachsanpham" });
        }
      },
  };
  </script>
<style>
.text-giohang{
  font-size: 3rem;
 color: #659fa5;
}
.phancach{
    margin-top: 3rem;
}
</style>
  