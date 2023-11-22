<template>
     <form @submit.prevent="submitthemgiohang">
                            <div class="row form-group">
                              <label for="soluong" class="col-3 mt-2"><b>Số Lượng :</b></label>
                                <div class="col-6">
                                   
                                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                            <p @click="giamsoluong()" class="btn btn-outline-secondary"><i class="fas fa-minus"></i></p>
                                            <p class="btn btn-outline-secondary">{{data.soluong}}</p>
                                            <p @click="tangsoluong()" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></p>
                                            <input  type="number" hidden
                                                            name="soluong"
                                                            readonly
                                                            class="sl text-center form-coltrol"
                                                            min="0"
                                                            :max="thongtinsanpham.soluong"
                                                            v-model="data.soluong"
                                                           >
                                    </div>
                                </div>
                                <div class="col-6 text-error"> 
                                  {{message}}
                                </div>
                            </div>
                                <div class="col-12 mt-4 form-group">
                               
                                    <button
                                        class="addgh text-center text-light form-control bg-danger shadow-sm rounded">
                                        THÊM VÀO GIỎ HÀNG
                                    </button>
                                   
                                </div>
                        </form>
</template>
<script>
import giohangService from "@/services/giohang.service";
export default {

  emits: ["submit:themgiohang"],
  props: {
    sanpham: {default: null }, // Dữ liệu user đăng nhập
    soluong: {default: 1},
    idkhachhang: {default: null},
  },
  watch: {
    sanpham: {
                handler(newVal) {
                    this.data = { idkhachhang: this.idkhachhang, idhanghoa: newVal._id, gia: newVal.gia, soluong: newVal.soluong==0 ? 0 : this.soluong };
                    this.thongtinsanpham = newVal;
                    this.message=null
                },
                immediate: true,
                },
    },    
            
    data() {
      return {
        thongtinsanpham: this.sanpham,
        message: null,
        idkhachhang: this.idkhachhang,
        data: { idkhachhang: this.idkhachhang, idhanghoa: this.sanpham._id, gia: this.sanpham.gia, soluong: this.sanpham.soluong==0 ? 0 : this.soluong },
        
      };
    },
    methods: {
   
    setMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 2000); // 2000 milliseconds (2 seconds)
    },
   async submitthemgiohang()  {
    try{
      
    
      const document = await giohangService.getByIdKhacHangVaIdSP(this.idkhachhang, this.thongtinsanpham._id);
     
    if(document && ((document.soluong + this.data.soluong) > this.thongtinsanpham.soluong)){
      // sản phẩm trong giỏ hàng đã đạt tối đa
        //  this.message="Số lượng sản phẩm trong giỏ hàng đã đạt tối đa."
          this.setMessage("Số lượng sản phẩm trong giỏ hàng đã đạt tối đa.");
          // không cho phép tổng sản phẩm trong giỏ hàng > tồn kho
    }
    else{
    //  alert('Tên hàng hoá' 
    //  + this.sanpham._id);
     // alert('daa id ' + this.data.idhanghoa);
      await this.$emit("submit:themgiohang", this.data);  // sự kiện submit
      this.setMessage('Đã thêm vào giỏ hàng');
    }
    }catch(error){
      console.log(error);
    }
  },
   giamsoluong(){
    if(this.sanpham.soluong==0){
     
    }
   else if (this.data.soluong <= 1) {
        this.message=null;
      } else {
        this.message = null;
        this.data.soluong= this.data.soluong - 1;
      }
   },
   tangsoluong(){
    if( this.thongtinsanpham.soluong==0){
        this.message="Hàng đã hết"
      }
      else if (this.data.soluong >= this.thongtinsanpham.soluong) {
        this.message = "Số lượng đã đạt tối đa";
      } else {
        this.data.soluong= this.data.soluong +1;
        this.message = null;
      }
   }
  },
}
</script>
<style>
.text-error{
    color: rgb(215, 78, 78);
}

</style>
