import express from 'express'
import multer from 'multer';
import menu from '../models/Menu.js'
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'../public')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload= multer({storage})
const menurouter=express.Router();

menurouter.post('/addmenu',upload.single('picture'),async(req,res)=>{
try {
    const {image,title,description,price,id,category}=req.body;
    // console.log(req.body)
  await  menu.create({
    image,title,description,price,id,category
  })
  res.json({
    message:"New item created",
    success:true
  })
} catch (error) {
    res.json({
        message:"Item not created",
        success:false,
        error
    })
}
})

menurouter.get('/menu',async(req,res)=>{
  const allmenu=await menu.find()
  res.send({
    success:true,
    allmenu
  })
})
export default menurouter;