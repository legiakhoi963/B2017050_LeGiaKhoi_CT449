import axios from "axios"; // thư viện tạo và quản lý các yêu cầu http


// biến đối tượng chứa cấu trình chung cho các yêu cầu http
const commonConfig = { 
    headers: {
        "Context-Type": "application/json",  // kiểu dữ liệu gửi json
        Accept: "application/json", // kiểu dữ liệu máy chủ trả về json
    }
};

export default (baseURL) => {
    return axios.create({
        baseURL,  //url
        ...commonConfig, // sao chép các trường giá trị của đối tượng commmonConfig
    });
}