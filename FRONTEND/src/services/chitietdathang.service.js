import createApiClient from "./api.service";
class DatHangService {
    constructor(baseUrl="/api/chitietdathang"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async getALLIdDatHang(iddathang) {
        return (await this.api.get(`/dathang/${iddathang}`)).data;
    }
    async deleteALLIdDatHang(iddathang){
        return (await this.api.delete(`/dathang/${iddathang}`)).data;
    }
}
       
export default new DatHangService();