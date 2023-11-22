<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="this.hanghoa">
        <!--Trang Form edit/thêm-->
        <FormSanPham
            :hanghoa="hanghoa"
            :mode="mode"
            @submit:hanghoa="updateHangHoa"
            @delete:hanghoa="deleteHangHoa"
         
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
 import { format, parse } from "date-fns";
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
                mode:'edit', // du lieu truyen vao form
                hinhanh: null,
                
            };
        },
        methods: {
          
            async getHangHoa() {
                const id = this.$route.params.id;
                    console.log(id);
                    try{
                    this.hanghoa = await hanghoaService.getById(id);
                   
                   
                   
                    if(this.hanghoa){
                        const hinhanh = await hinhanhService.getHinhAnhSanPham(this.hanghoa._id);
                                if (hinhanh.length > 0) {
                                    this.hanghoa.linkanh = hinhanh[0].linkanh;
                                    this.hanghoa.idanh = hinhanh[0]._id;
                            
                            } else {
                                this.hanghoa.linkanh = ''; // Hoặc đặt giá trị mặc định nếu không có hình ảnh
                            }
           }
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound 
                    this.$router.push({
                      name: "notfound",
                  
                  });
                }
            },
            async updateHangHoa(data, hinhanhdata,fileupload) {  // ham goi submit
                try {
                    const hoanghoa =   await hanghoaService.update(this.hanghoa._id, data);
                    if(hinhanhdata!=null){
                        const response = await hinhanhService.upload(hinhanhdata);
                    const imageUrl = response.url;
                        if(this.hanghoa.linkanh==''){
                         
                            this.hinhanh = {
                           linkanh: imageUrl,
                           tenanh: fileupload.name,
                           idhanghoa: this.hanghoa._id
                     }
                   
                      await hinhanhService.create(this.hinhanh);
                        }
                        else{
                            this.hinhanh = {
                        linkanh: imageUrl,
                        tenanh: fileupload.name,
                     }
                   
                     await hinhanhService.update(this.hanghoa.idanh,this.hinhanh);
                        }
                        // update hinh anh
                    }
                  
                    this.message = "Sản Phẩm đã được cập nhật thành công.";
                    alert(this.message);  // thông báo thành công
                    this.$router.push("/danhsachsanpham"); // chuyển về trang chủ
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteHangHoa() {  // ham cho phuong thuc delete
                if (confirm("Bạn muốn xóa sản phẩm này?")) {
                    try {
                        await hanghoaService.delete(this.hanghoa._id);
                        await hinhanhService.deleteHinhAnhSanPham(this.hanghoa._id);
                        alert('Xoá thành công');
                        this.$router.push({ name: "DanhSachSanPham" });
                       
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        beforeMount(){
        if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==4 || this.session_admin.quyen==3)){
          alert('Bạn không có quyền truy cập vào quản lý sản phẩm của cửa hàng');
          this.$router.push({ path: "/danhsachsanpham" });
        }
      },
      
        created() {
            this.getHangHoa();
            this.message = "";
           
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
  