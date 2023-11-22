<template>
      <Form class="col-10 offset-1 formdangky"  
      @submit="submitDangKy"
        :validation-schema="userFormSchema">
        <h2>Đăng ký thành viên</h2>
        <hr/>
        <div class="row form-group">
            <label for="hoten" class="form-label col-sm-3 nhaninput" >Họ và tên<span class="error">*:</span></label>
            <div class="col-9">
                <Field
                    name="hoten"
                    type="text"
                    class="form-control "
                    v-model="userDangKy.hoten"
                    placeholder="Nhập họ tên của bạn"
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
                        v-model="userDangKy.sdt"
                        placeholder="Nhập số điện thoại"
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
                    v-model="userDangKy.diachi"
                    placeholder="Nhập vào địa chỉ của bạn"
                />
                <ErrorMessage name="diachi" class="error-feedback" />     
            </div>      
        </div>
        <div class="row mb-3  mt-3 form-group">
            <label for="password" class="form-label col-3">Mật khẩu<span class="error">*:</span></label>
            <div class="col-9">
                <Field
                    name="password"
                    type="password"
                    class="form-control"
                    v-model="userDangKy.password"
                    placeholder="Nhập vào mật khẩu của bạn"
                />
                <ErrorMessage name="password" class="error-feedback" />
                     
            </div>
                     
        </div>
        <div class="row mb-3 mt-3 form-group">
            <label for="repassword" class="form-label col-3">Nhập lại mật khẩu<span class="error">*:</span></label>
            <div class="col-9">
                    <Field
                    v-model="userDangKy.repassword"
                        name="repassword"
                        type="password"
                        class="form-control"
                        placeholder="Xác nhận lại mật khẩu"
                    />
                    <ErrorMessage name="repassword" class="error-feedback" />      
            </div>        
        </div>
        <div class="row mt-3 dangky-button">
                <button class="btn" name="dangky">Đăng ký</button>
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
        emits: ["submit:dangky"],
        props: {
            user: { type: Object, default: null }, // dữ lieu user nhận từ useradd, useredit
        },
        data() {
            const userFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                hoten: yup.string().required("Vui lòng nhập họ tên").max(50, "Tên có nhiều nhất 50 ký tự."),
                //
                diachi: yup.string().required("Vui lòng nhập vào địa chỉ").max(100, "Địa chỉ tối đa 100 ký tự."),
                //
                sdt: yup.string().matches(/(([0-9]{10})\b)/g,"Số điện thoại không hợp lệ."),
                password: yup.string().required("Vui lòng nhập mật khẩu").max(50, "Mật khẩu có nhiều nhất 50 ký tự."),
                repassword: yup.string().required("Vui lòng xác nhận lại mật khẩu đăng ký").oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),

            });
            return {
                userDangKy: this.user || { hoten: "", sdt: "", diachi: "", password: "", repassword: "", agree: false},
                userFormSchema,
            };
        },
        methods: {
            submitDangKy() {
                this.$emit("submit:dangky", this.userDangKy);  // sự kiện submit
                
            },
        },
    };
</script>
<style>
.error-feedback {
    color: red;
}
</style>