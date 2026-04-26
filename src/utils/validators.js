const validator =require("validator")

const EmailValidator=(req)=>{

    const {emailId} = req.body;
    console.log(req.body.emailId)
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Format")
    }

}
module.exports=EmailValidator