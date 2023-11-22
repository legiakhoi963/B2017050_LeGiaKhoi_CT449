<script>
export default {
    props: { ////props sử dụng để định nghĩa các thuộc tính mà thành phần này sẽ nhận từ ngoài
         modelValue: { type: String, default: "" }, 
     },
    emits: ["submit", "update:modelValue"], //khai báo các sự kiện của thành phần
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);  // cập nhật dữ liệu
        },
        submit() {
            this.$emit("submit");
        },
     },
};
</script>
<template>
    <div  class="d-flex" id="form-search">
        <input class="form-control me-2 search" type="search"
            placeholder="Nhập thông tin cần tìm"
            :value="modelValue"
            @input="updateModelValue" 
            @keyup.enter="submit" >
        <button class="btn btn-ligth icon-search" type="submit"  @click="submit">
            <i class="fa fa-search"></i></button>
    </div>
</template>
<style>
</style>