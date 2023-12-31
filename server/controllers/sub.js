const Sub=require('../models/sub')
const slugify=require('slugify')
const Product=require('../models/product')
exports.create=async(req,res)=>{
    try{
        const {name,parent}=req.body;
        const sub=await new Sub({name,parent,slug:slugify(name)}).save();
        res.json(sub);
    }catch(err){
        console.log("Sub create error ----->", err);
        res.status(400).send("Create Sub failed");
    }
}
exports.list=async(req,res)=>{
    res.json(await Sub.find({}).sort({createdAt:-1}).exec());
}
exports.read=async(req,res)=>{
   let sub=await Sub.findOne({slug:req.params.slug}).exec()
    // res.json(sub) 
    let Products=await Product.find({subs:sub})
    .populate("category")
    .exec() 
    
    res.json({
        sub,
        Products
    })
}
exports.update=async(req,res)=>{
    const {name,parent}=req.body;
    try{
        const updated=await Sub.findOneAndUpdate(
            {slug:req.params.slug},
            {name,parent,slug:slugify(name)},
            {new:true}            
            );
            res.json(updated)
    }
    catch(err){
        console.log(err);
        res.status(400).send("Update Sub Failed")
    }
}
exports.remove=async(req,res)=>{
    try{
        let deleted= await Sub.findOneAndDelete({slug:req.params.slug});
        res.json(deleted);
    }
    catch(err){
        res.status(400).send("Delete Sub failed")
    }
}
