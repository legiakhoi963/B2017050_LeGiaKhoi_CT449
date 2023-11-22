import createApiClient from "./api.service";
class DatHangServicee {
    constructor(baseUrl="/api/dathang"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteALL() {
        return (await this.api.post("/")).data;
    }
    async getById(id){
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getALLIdKhachhang(idkhachhang) {
        return (await this.api.get(`/khachhang/${idkhachhang}`)).data;
    }
    async getALLIdNhanVien(idnhanvien) {
        return (await this.api.get(`/nhanvien/${idnhanvien}`)).data;
    }
    async deleteALLIdKhachhang(idkhachhang) {
        return (await this.api.delete(`/khachhang/${idkhachhang}`)).data
    }
    async deleteALLIdNhanVien(idnhanvien) {
        return (await this.api.delete(`/nhanvien/${idnhanvien}`)).data;
    }
    
}
       
export default new DatHangServicee();