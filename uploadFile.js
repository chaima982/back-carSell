const multer = require('multer')
const path = require('path') //path les images

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null, "storages") //storages hua el folder eli aamalneh jdid
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
}) 


const upload = multer({
    storage: storage,
    limits:{fileSize: "10000000000"},
    fileFilter:(req,file,cb)=>{
        const fileTypes= /jpeg|jpg|png|svg|pdf|gif|webp|bmp/ 
        const mimetype=fileTypes.test(file.mimetype) 
        const extname=fileTypes.test(path.extname(file.originalname))

        if(mimetype && extname) {
            return cb(null,true)
        }
        cb("erreur") 
    }
})

module.exports = upload