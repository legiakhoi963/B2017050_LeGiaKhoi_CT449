<template>

<div class="container-xl formthem">
        <Form
        @submit="submitHangHoa"
        :validation-schema="HangHoaFormSchema"  
    >
    <div class="row">
        <div class="col-md-6 col-xl-6">
        <div class="form-group col-6 offset-4">
            <label for="name">Tên Hàng Hoá</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="this.HangHoaLocal.tenhh"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group col-6 offset-4">
            <label for="mota">Mô tả</label>
            <Field
                name="mota"
                type="text"
                as="textarea"
                class="form-control"
                maxlength="100"
                v-model="this.HangHoaLocal.mota"
            />
            <ErrorMessage name="mota" class="error-feedback" />
        </div>
        <div class="form-group col-6 offset-4">
            <label for="thuonghieu">Thương Hiệu</label>
            <Field
                name="thuonghieu"
                type="text"
                class="form-control"
                v-model="this.HangHoaLocal.thuonghieu"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
        <div class="form-group col-6 offset-4">
            <label for="loaiHangHoa">Loại Hàng Hóa</label>
            
            <select
                name="loaiHangHoa"
                class="form-select"
                v-model="this.HangHoaLocal.idloai"
                
            >
               <option v-if="this.HangHoaLocal.idloai!=''" selected >{{this.HangHoaLocal.tenloai}}</option>
                <option v-for="loai in loaihang" :value="loai._id" >{{loai.tenloai}}</option>
               
                <!-- Thêm các loại hàng khác nếu cần -->
            </select>
    <ErrorMessage name="loaiHangHoa" class="error-feedback" />
    </div>
    </div>
    <div class="col-md-6 col-xl-6">
        <div class="form-group col-6">
            <label for="gia">Giá Bán</label>
            <Field
                name="gia"
                type="text"
                class="form-control"
                v-model="this.HangHoaLocal.gia"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
        <div class="form-group col-6">
            <label for="soluong">Số Lượng</label>
            <Field
                name="soluong"
                type="text"
                class="form-control"
                v-model="this.HangHoaLocal.soluong"
            />
            <ErrorMessage name="gia" class="error-feedback" />
        </div>
            <div class="form-group col-4">
            <label for="ngaysanxuat">Ngày sản xuất</label>
            <Field
                name="ngaysanxuat"
                type="date"
                class="form-control"
                v-model="this.HangHoaLocal.ngaysanxuat"
            />
            <ErrorMessage name="ngaysanxuat" class="error-feedback" />
        </div>
            <div class="form-group col-4">
            <label for="hansudung">Hạn sử dụng</label>
            <Field
                name="hansudung"
                type="date"
                class="form-control"
                v-model="this.HangHoaLocal.hansudung"
            />
            <ErrorMessage name="hansudung" class="error-feedback" />
      </div>
        <div class="form-group col-6">
            <label for="hinhanh">Hình ảnh</label>
            <input
                type="file"
                name="hinhanh"
                class="form-control-file mb-3"
                @change="handleFileChange"
            />
            <ErrorMessage name="hinhanh" class="error-feedback" />
            <div v-if="imageUrl">
                <img :src="imageUrl" alt="Hình ảnh" style="max-width: 100px; max-height: 100px;" />
            </div>
            <div v-else-if="this.HangHoaLocal.linkanh">
                <img :src="this.HangHoaLocal.linkanh" alt="Hình ảnh" style="max-width: 100px; max-height: 100px;" />
            </div>
           
            </div>
    </div>
    </div>
  
    <!--đặt kiểm tra dữ liệu gàng buộc với các trường nhập liệu :validation-schema="HangHoaFormSchema"  -->
      
     <div class="row mt-2 mb-5">
        <div class="form-group col-6 offset-6">
            <button class="btn btn-primary m-2">Lưu</button>   
            <button v-if="mode=='edit'"   type="button" class="m-2 btn btn-danger" @click="deleteHangHoa">Xóa</button> </div>
     </div> 
      
    </Form>
    </div>
    
</template>

<script>

import * as yup from "yup"; // thư viện xác thực kiểm tra tính hợp lệ
import { Form, Field, ErrorMessage } from "vee-validate"; // thư viện xây dựng các Form thực hiện xác thực dữ liệu
        //Form: tạo Form chứa các trường nhập liệu, quản lý trạng thái,sự kiện gửi.
        //Field: tạo các trường nhập liệu trong trong Form
        //ErrorMessage: hiển thị thông báo lỗi nếu việc kiểm tra tính hợp lệ thất bại.
import loaihangService from "@/services/loaihang.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:hanghoa", "delete:hanghoa"],
        props: {
            hanghoa: { type: Object, default: null }, // dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
            mode: { type: String, default: "create" },// dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
            
        },
        data() {
            const HangHoaFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                name: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự."),
                thuonghieu: yup.string().required("Thương hiệu phải có giá trị."),
                hansudung: yup.string()
            .required("Hạn sử dụng không được bỏ trống.")
            .test('date-order', 'Hạn sử dụng phải sau ngày sản xuất', function (value) {
                const ngaySanXuat = this.parent.ngaysanxuat;
                if (!ngaySanXuat || !value) {
                    return true; // Nếu một trong hai không có giá trị, thì coi như là hợp lệ
                }
                // hạn sử dụng > ngày sản xuất true cho qua
                return new Date(value) > new Date(ngaySanXuat);  }),

                ngaysanxuat: yup.string().required("Ngày sản xuất không được bỏ trống.")
                    .test('not-in-future', 'Ngày sản xuất không được vượt quá ngày hiện tại', function (value) {
                        const currentDate = new Date();
                        const selectedDate = new Date(value); // ngày sản xuất
                        // ngày sản xuất <= ngày hiện tại true thì cho qua
                        return selectedDate <= currentDate;
                    }),
                //
            
                //
                soluong: yup.string().required("Nhập số lượng hàng").test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
                gia: yup.string().required("Nhập giá bán").test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
            });
            return {
                HangHoaLocal: this.hanghoa || { tenhh:'', soluong: '', gia: '', mota: '', tenloai:'', idloai:'', thuonghieu:'', ngaysanxuat:'', hansudung:'' },
                HangHoaFormSchema,
                imageUrl: null,
                loaihang: [],
                fileupload: null,
            };
        },
        methods: {
            async getALLLoaiHang() {
   
                try {
                    // lấy danh sách các loại hàng
                    this.loaihang = await loaihangService.getAll();
                   
                    if(this.HangHoaLocal.idloai!='' && this.HangHoaLocal.idloai!=null){
                        const loai = await loaihangService.getById(this.HangHoaLocal.idloai);
                        this.HangHoaLocal.tenloai = loai.tenloai;
                    }
                } catch (error) {
                    console.log(error);
                }
                },
            submitHangHoa() {
                /* this.loaihang.forEach((loai) => {
                    if(this.HangHoaLocal.tenloai==loai.tenloai){
                        this.HangHoaLocal.idloai = loai._id;
                        alert(this.HangHoaLocal.idloai);
                        alert(this.HangHoaLocal.tenloai);
                    }
                 }); */
                if (!this.fileupload && this.mode=='edit') {
                   
                    this.$emit("submit:hanghoa", this.HangHoaLocal,null);  // sự kiện submit
                    }
                    else if(!this.fileupload && this.mode!='edit'){
                        alert('Bạn chưa thêm ảnh cho sản phẩm');
                        console.error("No file selected.");
                        return;
                    }
                else{
                    const formData = new FormData();
                    formData.append("file", this.fileupload);
                    this.$emit("submit:hanghoa", this.HangHoaLocal,formData, this.fileupload);  // sự kiện submit
                } 
              
                
            },
            deleteHangHoa() {
                this.$emit("delete:hanghoa", this.HangHoaLocal.id);  // sự kiện delete
            },
      handleFileChange(event) {
        this.fileupload = event.target.files[0];
        this.getImagePreviews(this.fileupload);
      },
      getImagePreviews(image) {
        if(/\.(jpe?g|png)$/i.test(image.name) && image.size < 1000000000){
          let reader = new FileReader();
        reader.onloadend = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(image);
        }
        else{
            this.error = "File is not support for size bigger than 1MB"
            alert(this.error)
        }
      
      },
        },
    created(){
            this.getALLLoaiHang(); // gọi khi trang vừa được load
            if(this.hanghoa){
            this.HangHoaLocal = this.hanghoa;

        }
       
        
            }
      
        
    };
</script>
<style scoped>
label {
    margin-top: 1rem;
    margin-bottom: 1rem;;
    font-weight: 500;
}
.formthem{
    margin-left: 14rem;
    margin-right: 10rem;
}

.error-feedback {
    color: red;
}
</style>