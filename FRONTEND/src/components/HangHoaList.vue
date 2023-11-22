<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="(hanghoa, index) in paginatedList" :key="hanghoa._id" :class="{ active: (((this.currentPage - 1) * this.itemsPerPage)+index)  === activeIndex }" @click="updateActiveIndex(index)">
          <td class="pt-2" v-if="(((this.currentPage - 1) * this.itemsPerPage)+index) == activeIndex" style="background-color:  #adb5bd;">
           {{ hanghoa.tenhh }}
          </td>
          <td class="pt-2 " v-else>
           {{hanghoa.tenhh}}
          </td>
          <td>
            <div v-if="this.quyen==1 || this.quyen==2">                           
              <i class="fa-solid fa-trash icon-xoa" data-bs-toggle="modal" :data-bs-target="'#delete-confirm1-' + index"></i>
                      <div class="modal fade" :id="'delete-confirm1-' + index" tabindex="-1" aria-labelledby="delete-confirm1Label" aria-hidden="true">
                        <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <h5><b>Bạn có chắc muốn xoá sản phẩm này?</b></h5>
                                                  </div>
                                        <div class="modal-footer">
                                          <button  class="btn btn-xs btn-danger" data-bs-dismiss="modal" @click="deleteHangHoa(hanghoa)">Delete</button>
                              <a type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</a>
                             <!--xử lý xoá-->
                            
                             
                            </div>
                        </div>
                        </div>
                    </div>
                  

                </div>
          <div v-else>                           
            <i class="fa-solid fa-trash icon-xoa" data-bs-toggle="modal" data-bs-target="#delete-confirm1"></i>
                    <div class="modal fade" id="delete-confirm1" tabindex="-1" aria-labelledby="delete-confirm1Label" aria-hidden="true">
                        <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <h5><b>Bạn không có quyền xoá các sản phẩm</b></h5>
                                                  </div>
                                        <div class="modal-footer">
                           
                              <button  class="btn btn-xs btn-danger" data-bs-dismiss="modal">OK</button>
                             
                            </div>
                        </div>
                        </div>
                    </div>
                  

                </div>
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
    listhanghoa: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
    quyen: { type: Number, default: -1 }
  },
  emits: ["update:activeIndex","delete:hanghoa"],
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
      return this.listhanghoa.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.listhanghoa.length / this.itemsPerPage); // số trang cần hiển thị
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
    deleteHangHoa(hanghoa) {
                this.$emit("delete:hanghoa", hanghoa);  // sự kiện delete
            },
   
  },
  mounted(){
    //alert(this.quyen);
  }
};
</script>
<style scoped>
/* Scoped styles for the component */
.active {
  background-color: #8eb9be !important; /* Change this to the desired color */
}
.table tr {
    cursor: pointer;
}
</style>