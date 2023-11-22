<template>
    <Form class="row form-capnhat"  
    @submit="submitKhachHang"
      :validation-schema="khachhangFormSchema">
     
      <hr/>
      <div class="row mb-3 mt-3 form-group">
          <label for="hoten" class="form-label col-sm-3 nhaninput" >Họ và tên<span class="error">*:</span></label>
          <div class="col-9">
              <Field
                  name="hoten"
                  type="text"
                  class="form-control "
                  v-model="nguoidungLocal.hoten"
                 
              />
              <ErrorMessage name="hoten" class="error-feedback" />
                      
          </div>
      </div>
      <div class="row mb-3 mt-3 form-group">
          <label for="sdt" class="form-label col-sm-3">Số điện thoại<span class="error">*:</span></label>
              <div class="col-9">
               <Field
                      name="sdt"
                      type="text"
                      class="form-control "
                      v-model="nguoidungLocal.sdt"
                     
                  />
              <ErrorMessage name="sdt" class="error-feedback" />    
          </div>
          
      </div>
          
      <div class="row mb-3 mt-3 form-group">
                     
          <label for="diachi" class="form-label col-3">Địa Chỉ<span class="error">*:</span></label>
          <div class="col-9">
              <Field
                  name="diachi"
                  type="text"
                  class="form-control "
                  v-model="nguoidungLocal.diachi"
                  
              />
              <ErrorMessage name="diachi" class="error-feedback" />     
          </div>      
      </div>
     
      <div class="row mt-2 mb-5">
        <div class="form-group col-6 offset-7">
        <button class="btn btn-primary m-2">Lưu</button>   
        <button  type="button" class="m-2 btn btn-danger" @click="deletenguoidung">Xóa</button> </div>
     </div> 
  </Form>
</template>
<script>
    import * as yup from "yup"; // thư viện xác thực kiểm tra tính hợp lệ
    import { Form, Field, ErrorMessage } from "vee-validate"; // thư viện xây dựng các Form thực hiện xác thực dữ liệu
        //Form: tạo Form chứa các trường nhập liệu, quản lý trạng thái,sự kiện gửi.
        //Field: tạo các trường nhập liệu trong trong Form
        //ErrorMessage: hiển thị thông báo lỗi nếu việc kiểm tra tính hợp lệ thất bại.
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:nguoidung", "delete:nguoidung"],
        props: {
            nguoidung: { type: Object, default: null }, // dữ lieu nguoidung nhận từ nguoidungadd, nguoidungedit
            mode: { type: String, default: "create" },// dữ lieu nguoidung nhận từ nguoidungadd, nguoidungedit
        },
        data() {
            const khachhangFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                hoten: yup.string().required("Vui lòng nhập họ tên").max(50, "Tên có nhiều nhất 50 ký tự."),
                //
                diachi: yup.string().required("Vui lòng nhập vào địa chỉ").max(100, "Địa chỉ tối đa 100 ký tự."),
                //
                sdt: yup.string().matches(/(([0-9]{10})\b)/g,"Số điện thoại không hợp lệ."),
              
            });
            return {
                nguoidungLocal: this.nguoidung || { hoten: "", sdt: "", diachi: "", password: "", repassword: "", chucvu: "" },
                khachhangFormSchema,
            };
        },
        methods: {
            submitKhachHang() {
             
                this.$emit("submit:nguoidung", this.nguoidungLocal);  // sự kiện submit  
            },
            deletenguoidung() {
                this.$emit("delete:nguoidung");  // sự kiện delete
            },
        },
    };
</script>
<style scoped>
.form-capnhat{
 margin-left: 3rem;
 margin-right: 3rem;
}
.error-feedback{
    color: red;
}
</style>
