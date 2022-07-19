import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/public/img")
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+"-"+file.originalname)
    }
})

const uploader = multer({storage: storage})

export default uploader;