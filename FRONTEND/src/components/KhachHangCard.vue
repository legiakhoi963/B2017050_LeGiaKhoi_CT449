

<template>

              <div>
                <div class="shadow p-2 mb-5 bg-body rounded">
                    <div class="row p-4 " v-if="this.nguoidung">
                        <div class="col-md-12 text-success">
                            <h5> <span><i class="fa-solid fa-user"></i></span> Chi Tiết Khách Hàng</h5>
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
                            Địa chỉ: 
                          </b>
                         {{this.nguoidung.diachi}}
                        
                        </div>
                        <div class="col-md-12 mt-2">
                          <b>Số đơn hàng đã mua :</b>
                            {{this.nguoidung.sodondamua}}
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