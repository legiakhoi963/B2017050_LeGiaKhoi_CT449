const ApiError = require("../api-error");
const HinhAnhService = require("../services/hinhanh.services");
const MongoDB = require("../utils/mongodb.util");
const jwt = require('jsonwebtoken');
const { singleUpload, formatBuffer, cloudinaryUpload } = require("../services/upload.services");


exports.upload = async (req, res,next) => {
    try {
        singleUpload(req, res, async (error) => {
            if (error) {
                return next(new ApiError(404, "Image upload failed"));
            }

            const file64 = formatBuffer(req.file);
            const uploadResult = await cloudinaryUpload(file64.content);
            console.log(uploadResult);

            // Thêm mã xử lý tải lên ảnh vào cơ sở dữ liệu ở đây nếu cần

            return res.send({
                cloudinaryId: uploadResult.public_id,
                url: uploadResult.secure_url,
                message: "Upload OK!",
            });
        });
    } catch (error) {
        return next(new ApiError(404, error.message));
    }
}

exports.create = async (req, res, next) => {
    if(req.body.linkanh==null){
        return next(new ApiError(400, "Data can not be empty"));
    }
    else{
        try{
          const hinhAnhService = new HinhAnhService(MongoDB.client);
        //  const exitLoaiHang = await hinhAnhService.findOne({linkanh: req.body.linkanh});
       //   if(exitLoaiHang){
           // ảnh tồn tại
           /* return res.send({
                message: 'Loại hàng đã tồn tại',
                newHinhAnh: exitLoaiHang
              });  */
           //   return next(new ApiError(404, "Loại hàng đã tồn tại"));
         // }
            const newHinhAnh = await hinhAnhService.create(req.body);
            return res.send({
                message: 'Đã thêm mới',
                newHinhAnh: newHinhAnh
              }); 

          
        }catch(e){
            return next(new ApiError(500, "Lỗi server "));
        }
    }
}
exports.findALL = async (req, res, next) => {
    let listHinhAnh = []
    try{
        const hinhAnhService = new HinhAnhService(MongoDB.client);
        const { linkanh } = req.query;
        if(linkanh){
            listHinhAnh = await hinhAnhService.findByName(linkanh);
        }
        else{
            listHinhAnh = await hinhAnhService.find({});
        }  
    }catch(e){
        return next(new ApiError(500, "Lỗi server "));
    }
    return res.send(listHinhAnh);

}

exports.findByIdHangHoa =  async (req, res, next) => {  // lấy tên ảnh theo của sản phẩm
    try{
        const hinhAnhService = new HinhAnhService(MongoDB.client);
        const document = await hinhAnhService.find({
           idhanghoa: req.params.id
        });  
        if(!document){
            return next(new ApiError(404, "Không tìm thấy hình ảnh của sản phẩm"));
        }
        return res.send(document);
    }catch(e){
        return next(new ApiError(500, "Lỗi server "));
    }
}

exports.update = async (req,res, next) => {
    if(Object.keys(req.body).length == 0){
     return next(new ApiError(400,"Data to update can not be empty"));
    }
    try{
     const hinhAnhService = new HinhAnhService(MongoDB.client);
     console.log("goi ham update " + req.params.id + " " + req.body);
     const document = await hinhAnhService.update(req.params.id, req.body);
     if(!document){
         return next(new ApiError(404,"Contact not found"));
     }
     return res.send({
         message: "updated successfully"
     });
    }catch(err){
     return next(new ApiError(500, `Lỗi server update  with id=${req.params.id}`));
    }
 };
 
 exports.delete = async (req,res, next) => {
     try{
         const hinhAnhService = new HinhAnhService(MongoDB.client);
        
         const document = await hinhAnhService.delete(req.params.id);
        
         if(!document){
             return next(new ApiError(404, "Contact not found"));
         }
         return res.send({
             message: " deleted succesfully"
         });
     }catch(err){
         return next(new ApiError(500, `Could not delete with id=${req.params.id}`));
     }
 }

 exports.findOne = async(req,res, next) => { 
    try{
        const hinhAnhService = new HinhAnhService(MongoDB.client);
        const document = await hinhAnhService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Không tìm thấy hình ảnh "));
        }
        return res.send(document);
    }catch(e){
        return next(new ApiError(500, "Lỗi server "));
    }
 }
 exports.deleteByIdHangHoa = async (req,res, next) => {
    try{
        const hinhAnhService = new HinhAnhService(MongoDB.client);
       
      const document =  await hinhAnhService.deleteByIdHangHoa(req.params.id);
       
        if(!document){
            return next(new ApiError(404, " not found"));
        }
        return res.send({
            message: " deleted succesfully"
        });
    }catch(err){
        return next(new ApiError(500, `Could not delete with id=${req.params.id}`));
    }
}





