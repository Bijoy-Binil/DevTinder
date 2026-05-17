const AdminAuth = (req,res,next)=>{
   const token ="1234"
   
    if(token !== "1234"){
        res.send("Access denied. Admin only.");
    }else{
        res.send("Admin authenticated successfully.");
    }
    next();
};

module.exports = AdminAuth;