<template>

    <div class="container-xl ">
    <Form
            @submit="submitLoaiHang"
            :validation-schema="LoaiHangFormSchema"  
        >
        <div class="col-md-5 text-success">
            <h5 v-if="mode=='create'">Thêm loại hàng</h5>
            <h5 v-if="mode=='edit'">Loại hàng</h5>
                            <hr>
            </div>
        <div class="row formthem">
            <div class="form-group col-8">
                <label for="name">Tên Loại Hàng</label>
                <Field
                    name="name"
                    type="text"
                    class="form-control"
                    v-model="this.LoaiHangLocal.tenloai"
                />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
       
        </div>
      
        <!--đặt kiểm tra dữ liệu gàng buộc với các trường nhập liệu :validation-schema="LoaiHangFormSchema"  -->
          
         <div class="row mt-2 mb-5 formthem">
            <div class="form-group col-6">
                <button class="btn btn-primary m-2">Lưu</button>   
                <button v-if="mode=='edit'"  type="button" class="m-2 btn btn-danger" @click="deleteLoaiHang">Xóa</button> </div>
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

    
        export default {
            watch: {
                loaihang: {
                handler(newVal) {
                    this.LoaiHangLocal = { ...newVal };
                },
                immediate: true,
                },
            },
            components: {
                Form,
                Field,
                ErrorMessage,
            },
            emits: ["submit:loaihang", "delete:loaihang"],
            props: {
                loaihang: { type: Object, default: null }, 
                mode: { type: String, default: "create" },
                
            },
            data() {
                const LoaiHangFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                    // định nghĩa các ràng buộc dữ liệu nhập vào
                    name: yup.string().required("Tên loại hàng phải có giá trị.").min(2, "Tên loại hàng phải ít nhất 2 ký tự."),
                    
                });
                return {
                    LoaiHangLocal: this.loaihang || { tenloai:''},
                    LoaiHangFormSchema,
                };
            },
            methods: {
                submitLoaiHang() {     
                        this.$emit("submit:loaihang", this.LoaiHangLocal);  // sự kiện submit
                },
                deleteLoaiHang() {
                    this.$emit("delete:loaihang", this.LoaiHangLocal);  // sự kiện delete
                },
        
            },
         
        
          
            
        };
    </script>
    <style scoped>
    label {
        margin-top: 1rem;
        margin-bottom: 1rem;;
        font-weight: 500;
    }
    .formthem{
        margin-left: 6rem;
     
    }
    
    .error-feedback {
        color: red;
    }
    form{
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
    }
    </style>