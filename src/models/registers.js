const mongoose=require('mongoose')
const validator=require('validator')
const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    conpassword:{
        type:String,
        required:true
    }
})
studentSchema.path('email').validate(()=>{
    return true
},'email exists')
const Mydata=new mongoose.model("Mydata",studentSchema);
module.exports=Mydata;