

<template>
     <div class="log container">
            <div class="row px-xl-4 pb-2">
                <div class="col-xl-6 col-md-12 mb-3">
                    <div class="img_e" >
                        <img v-if="this.sanphams.linkanh" :src="this.sanphams.linkanh" alt="Khong load được ảnh"
                            style="width: 20rem; height:20rem">
                    </div>
                </div>
                <div class="col-xl-6 col-md-12">
                    <div class="product_info">
                        <h2>
                            {{this.sanphams.tenhh}}
                        </h2>
                        <h1 class="text-danger">
                            {{formattedGia(this.sanphams.gia)}}
                        </h1>
                        <div class="row">
                            <div class="col-6">
                            
                                <p v-if="this.sanphams.soluong==0" class="text-hethang"> <b>Số lượng còn:</b> {{this.sanphams.soluong}} Hết hàng</p>
                                <p v-else> <b>Số lượng còn:</b> {{this.sanphams.soluong}}</p>
                                <p> <b>Thương hiệu:</b> {{this.sanphams.thuonghieu}} </p>
                            </div>
                            
                           
                        </div>
                        <div class="row">
                                <p><b>Mô tả: </b> {{this.sanphams.mota}}</p>
                                
                            </div>
                            <div class="row">
                                <p><b>Loại Hàng: </b> {{this.sanphams.tenloai}}</p>
                                
                            </div>
                            <div class="row">
                                <p><b>Ngày sản xuất: </b> {{this.sanphams.ngaysanxuat}}</p>
                                
                            </div>
                            <div class="row">
                                <p><b>Hạn sử dụng: </b> {{this.sanphams.hansudung}}</p>
                                
                            </div>
                       
                    </div>

                </div>
            </div>
        </div>
</template>
<script>
    export default {
        props: {
             sanphams: { type: Object, required: true },
        },
        methods: {
            formattedGia(gia) {
            if (gia) {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(gia);
            }
            return "0 VND";
        },
        }
    };
</script>