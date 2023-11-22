import createApiClient from "./api.service";
class GioHangService {
    constructor(baseUrl="/api/giohang"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async getByIdKhacHangVaIdSP(idkhachhang, idhanghoa) {
        return (await this.api.get(`/${idkhachhang}/${idhanghoa}`)).data;
    }
    async getALLSPGioHangKhachHang(idkhachhang) {
        return (await this.api.get(`/khachhang/${idkhachhang}`)).data;
    }
    async deleteALLSPGioHangKhachHang(idkhachhang){
        return (await this.api.delete(`/khachhang/${idkhachhang}`)).data;
    }
    async getByIdSP(idhanghoa) {
        return (await this.api.get(`/hanghoa/${idhanghoa}`)).data;
    }

}
       
export default new GioHangService();