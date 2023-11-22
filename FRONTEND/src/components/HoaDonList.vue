<template>
    <div>
        <table class="table ">
                        <thead>
                            <tr>
                              <th scope="col">Khách đặt hàng</th>
                                <th scope="col">Ngày đặt</th>
                                <th scope="col">Ngày Giao</th>
                                <th scope="col">Tổng Tiền</th>
                                <th scope="col">Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(dathang, index) in paginatedList" :key="dathang._id" :class="{ active: (((this.currentPage - 1) * this.itemsPerPage) + index) === activeIndex }" @click="updateActiveIndex(index)">
                            <td class=" pt-3" style="background-color: #8eb9be" v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex">
                                    <div class="col p-0">
                                      {{dathang.tenkhachhang}}
                                    </div>
                                </td>
                                <td class=" pt-3" v-else>
                                    <div class="col p-0">
                                      {{dathang.tenkhachhang}}
                                    </div>
                                </td>    
                            <td class=" pt-3" style="background-color: #8eb9be" v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex">
                                    <div class="col p-0">
                                      {{dathang.ngaydat}}
                                    </div>
                                </td>
                                <td class=" pt-3" v-else>
                                    <div class="col p-0">
                                      {{dathang.ngaydat}}
                                    </div>
                                </td>
                                <td class="pt-3"  v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex" style="background-color: #8eb9be"> 
                                  <div class="col" v-if="dathang.tinhtrang=='Chờ xác nhận'">
                                    {{dathang.ngaygiao}} <br/> (Dự Kiến)
                                  </div>
                                  <div class="col" v-else>
                                    {{dathang.ngaygiao}}
                                  </div>
                                </td>
                                <td class="pt-3" v-else > 
                                  <div class="col" v-if="dathang.tinhtrang=='Chờ xác nhận'">
                                    {{dathang.ngaygiao}} <br/> (Dự Kiến)
                                  </div>
                                  <div class="col" v-else>
                                    {{dathang.ngaygiao}}
                                  </div>
                                </td>
                                <!-- tang giam sl -->
                                <td class="pt-3" v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex" style="background-color: #8eb9be">
                                  {{formattedGia(dathang.tongtien)}}
                                </td>
                                <td class="pt-3" v-else>
                                  {{formattedGia(dathang.tongtien)}}
                                </td>
                                <!-- tong tien -->
                                <td class=" pt-3 text-danger" v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex && dathang.tinhtrang=='Đã huỷ'" style="background-color: #8eb9be">
                                  {{dathang.tinhtrang}}
                                </td>
                                <td class=" pt-3" v-else-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex && dathang.tinhtrang!='Đã huỷ'" style="background-color: #8eb9be">
                                  {{dathang.tinhtrang}}
                                </td>
                                <td class=" pt-3" v-else-if="dathang.tinhtrang!='Đã huỷ'">
                                  {{dathang.tinhtrang}}
                                </td>
                                <td class=" pt-3 text-danger" v-else-if="dathang.tinhtrang=='Đã huỷ'">
                                  {{dathang.tinhtrang}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
      <nav aria-label="Page navigation" class="navpasge">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" aria-label="Previous" @click="goToPage(currentPage - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" aria-label="Next" @click="goToPage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  <script>
  export default {
    props: {
      listdathang: { type: Array, default: [] },
      activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex","delete:DatHang"],
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      paginatedList() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;  // vị trí bắt đầu
        const endIndex = startIndex + this.itemsPerPage;  // vị trí kết thúc
        return this.listdathang.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.listdathang.length / this.itemsPerPage); // số trang cần hiển thị
      },
    },
    methods: {
      updateActiveIndex(index) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const originalIndex = startIndex + index;
          this.$emit("update:activeIndex", originalIndex);
          console.log("Active Index:", originalIndex);
      //  this.$emit("update:activeIndex", index);
      //  console.log("Active Index:", index)
      },
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      deleteDatHang(DatHang) {
                  this.$emit("delete:DatHang", DatHang);  // sự kiện delete
              },
              formattedGia(gia) {
                    if (gia) {
                        return new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(gia);
                    }
                    return "0 VND";
                },
             
     
    },
  };
  </script>
  <style>
  /* Scoped styles for the component */
  .table tr {
      cursor: pointer;
  }
  .table .active {
    background-color: #8eb9be !important;
}

  </style>