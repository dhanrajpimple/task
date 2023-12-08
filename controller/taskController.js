const bcrypt = require("bcryptjs");
const Task = require("../model/Task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async(req, res)=> {
    try{
        const {email, username, password} = req.body;
        const exist = await Task.findOne({email});

        if(exist){
            return res.status(400).json({
                success:false,
                message:'user already Exists',
            });
        }

        let secure;
        try{
            secure = await bcrypt.hash(password, 12);
        }
        catch (e) {
            return res.status(500).json({
                success:false,
                message:'error in secure',
            });
        }

            const user = await Task.create({
                email,username, password:secure
            })
            return res.status(200).json({
                success:true,
                message:"user create successfully"
            });

    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"server error",
            error,
        });
    }
}

exports.login = async (req, res)=>{
    try {
          const {username , password} = req.body;
        
          if(!username || !password){
            return res.status(400).json({
                success: false,
                message:"fill the details",
            })
          }
          let user = await Task.findOne({username});
          if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not registered',
            });
          }
         
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'invalid password',
            });  
        
        }
        return res.status(200).send({
            success:true,
            message:"login  successfully",
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"server error",
            error,
        });
    }
}

exports.forgetPassword = async (req, res)=>{
    try {
        const {email, username , newPassword} = req.body;
        if(!email || !username){
            return res.status(401).send({
                success:false,
                message:"please provide email or password",
            })
        }
        let user = await Task.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not registered',

            });
        }
        let secure1;
        try{
            secure1 = await bcrypt.hash(newPassword, 12);
        }
        catch (e) {
            return res.status(500).json({
                success:false,
                message:'error in secure1',
            });
        }
  
        

  const user1 = await Task.findOneAndUpdate({ username: username },
    { $set: { password: newPassword.secure1 } },)
      
        return res.status(200).send({
            success:true,
            message:"change password successfully",
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"server error",
            error,
        });
    }
}