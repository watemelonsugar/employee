const { Schema } = require("../schema/zod");

module.exports  = async function  (req,res,next) {
    const {name,dept,dob,gender,designation,salary,email} = await req.body;
    console.log("req.path",req.path);

    if(req.path == "/create"){
        try{
            Schema.parse(req.body);
        }catch(err){
            console.log("error message",err.message);
            return res.status(401).json("validation error")
        }
    }
    
next()
}