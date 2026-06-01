const validator =require("validator")

const EmailValidator=(req)=>{

    const {emailId} = req.body;
    console.log(req.body.emailId)
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email Format")
    }

}
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","age","about","gender","photo_url"]
const data = req.body

  const isEditAllowed=Object.keys(req.body).every((field)=>{
        if(!allowedEditFields.includes(field)){
            throw new Error("Invalid Edit Field")
        }        return true;
    })
    return isEditAllowed;
}
    const passwordValidator=(req)=>{
        const {password}=req.body;
        if(!validator.isLength(password, { min: 6, max: 100 })){
            throw new Error("Password must be between 6 and 100 characters long");
        }
        return true;
    }

module.exports={EmailValidator,validateEditProfileData,passwordValidator}