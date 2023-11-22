<template>
    <Form class="row form-capnhat"  
    @submit="submitNguoiDung"
      :validation-schema="nguoidungFormSchema">
     
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
      <div class="row mb-3 mt-3 form-group" >
          <label for="chucvu" class="form-label col-sm-3 nhaninput" >Chức Vụ<span class="error">*:</span></label>
          <div class="col-9">
              <Field
                  name="chucvu"
                  type="text"
                  class="form-control "
                  v-model="nguoidungLocal.chucvu"
                  
              />
              <ErrorMessage name="chucvu" class="error-feedback" />
                      
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
      <div class="row mb-3  mt-3 form-group" >
          <label for="password" class="form-label col-3">Mật khẩu<span class="error">*:</span></label>
          <div class="col-9">
              <Field
                  name="password"
                  type="password"
                  class="form-control"
                  v-model="nguoidungLocal.password"
                 
              />
              <ErrorMessage name="password" class="error-feedback" />
                   
          </div>
                   
      </div>
      <div class="row mb-3 mt-3 form-group" >
          <label for="repassword" class="form-label col-3">Nhập lại mật khẩu<span class="error">*:</span></label>
          <div class="col-9">
                  <Field
                  v-model="nguoidungLocal.repassword"
                      name="repassword"
                      type="password"
                      class="form-control"
                     
                  />
                  <ErrorMessage name="repassword" class="error-feedback" />      
          </div>        
      </div>
      <div class="row mb-3 mt-3 form-group" >
        <label for="repassword" class="form-label col-3">Quyền tài khoản<span class="error">*:</span></label>
        <div class="col-3">
            <select 
                            name="quyen"
                            class="form-select"
                            v-model="nguoidungLocal.quyen"
                            
                        >
                                <option selected>{{nguoidungLocal.quyen}}</option>
                                <option v-if="nguoidungLocal.quyen!=0">0</option>
                                    <option v-if="nguoidungLocal.quyen!=1">1</option>
                                    <option v-if="nguoidungLocal.quyen!=2">2</option>
                                    <option v-if="nguoidungLocal.quyen!=3">3</option>
                                    <option v-if="nguoidungLocal.quyen!=4">4</option>
                        
                           
                        </select>

        </div>
        <div class="col-6">
            <p v-if="nguoidungLocal.quyen==0">Không</p>
            <p v-if="nguoidungLocal.quyen==1">Quản lý tất cả</p>
            <p v-if="nguoidungLocal.quyen==2">Quản lý sản phẩm</p>
            <p v-if="nguoidungLocal.quyen==3">Quản lý đơn hàng</p>
            <p v-if="nguoidungLocal.quyen==4">Quản lý người dùng</p>

        </div>
     
                        </div>
      <div class="row mt-2 mb-5">
        <div class="form-group col-6 offset-7">
        <button class="btn btn-primary m-2">Lưu</button>   
        <button v-if="mode=='edit'"  type="button" class="m-2 btn btn-danger" @click="deletenguoidung">Xóa</button> </div>
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
            const nguoidungFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                hoten: yup.string().required("Vui lòng nhập họ tên").max(50, "Tên có nhiều nhất 50 ký tự."),
                //
                diachi: yup.string().required("Vui lòng nhập vào địa chỉ").max(100, "Địa chỉ tối đa 100 ký tự."),
                //
                sdt: yup.string().matches(/(([0-9]{10})\b)/g,"Số điện thoại không hợp lệ."),
                chucvu: yup.string().required("Vui lòng nhập vào chức vụ của nhân viên").min(2, "Chức vụ ít nhất 2 kí tự"),
               // password: yup.string().required("Vui lòng nhập mật khẩu").max(50, "Mật khẩu có nhiều nhất 50 ký tự."),
               // repassword: yup.string().required("Vui lòng xác nhận lại mật khẩu đăng ký").oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
               repassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
              
            });
            return {
                nguoidungLocal: this.nguoidung || { hoten: "", sdt: "", diachi: "", password: "", repassword: "", chucvu: "", quyen: 0 },
                nguoidungFormSchema,
            };
        },
        methods: {
            submitNguoiDung() {
                this.$emit("submit:nguoidung", this.nguoidungLocal);  // sự kiện submit
                
            },
            deletenguoidung() {
                this.$emit("delete:nguoidung", this.nguoidungLocal._id);  // sự kiện delete
            },
        },
    };
</script>
<style scoped>
.form-capnhat{
 margin-left: 25rem;
 margin-right: 25rem;
}
.error-feedback{
    color: red;
}
</style>
