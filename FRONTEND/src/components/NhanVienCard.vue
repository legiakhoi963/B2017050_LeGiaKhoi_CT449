

<template>
   
 <div class="col-md-12">
    <div class="shadow p-2 mb-5 bg-body rounded">
        <div class="row p-4 " v-if="this.nguoidung">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-user"></i></span> Chi Tiết Nhân Viên</h5>
                            <router-link id="route-link" style="text-decoration: none; color: #2b7778;"
                              :to="{ name: 'editnhanvien', params: { id: this.nguoidung._id } }"
                              >
                          <i class="fas fa-edit"></i> Chỉnh sửa
                      </router-link>
                            <hr>
                        </div>
                        <div class="col-md-12 mt-2">
                          <b>Họ Tên :</b> {{this.nguoidung.hoten}}
                        </div>
                        <div class="col-md-12 mt-2">
                          <b>Số điện thoại: </b>
                            {{this.nguoidung.sdt}}
                        </div>
                        <div class="col-md-12 mt-3">
                            <b>
                            Chức vụ: 
                          </b>
                         {{this.nguoidung.chucvu}}
                        
                        </div>
                        <div class="col-md-12 mt-3">
                            <b>
                            Địa chỉ: 
                          </b>
                         {{this.nguoidung.diachi}}
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.nguoidung.quyen==0">
                            <b>
                            Quyền tài khoản: 
                          </b>
                         Không
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.nguoidung.quyen==1">
                            <b>
                            Quyền tài khoản: 
                          </b>
                         Quản lý tất cả
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.nguoidung.quyen==2">
                            <b>
                            Quyền tài khoản: 
                          </b>
                         Quản lý sản phẩm
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.nguoidung.quyen==3">
                            <b>
                            Quyền tài khoản: 
                          </b>
                         Quản lý đơn hàng
                        
                        </div>
                        <div class="col-md-12 mt-3" v-if="this.nguoidung.quyen==4">
                            <b>
                            Quyền tài khoản: 
                          </b>
                         Quản lý người dùng
                        
                        </div>
                        
                        <div class="col-md-12 mt-2">
                          <b>Số đơn hàng quản lý :</b>
                            {{this.nguoidung.sodonquanly}}
                        </div>
                    </div>
                </div>
              </div>
</template>
<script>
   export default {
       props: {
            nguoidung: { type: Object, required: true },
       },
       methods: {
       }
   };
</script>