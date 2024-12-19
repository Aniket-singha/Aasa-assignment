const jwt=require('jsonwebtoken')
const pool=require('../db')
const bcrypt = require('bcrypt');
const {promisify}=require('util');
const { decode } = require('punycode');

exports.signup=async(req,res)=>{

    const {username,email,password}=req.body;
   
    try{
    const result=await pool.query('insert into users (username,email,password) values ($1,$2,$3) returning *',[username,email,password]);
    const user=result.rows[0];

    
    const token = jwt.sign({id: user.id,username:user.username,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    const cookieOptions={
       expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
       httpOnly:true
    }

    res.cookie('jwt',token,cookieOptions)

    res.status(200).json({
        status:'success',
        data:{id:user.id,email:user.email,username:user.username}
    })
}
catch(err) { 
    console.error(err);
    res.status(500).json({ 
        status: 'error',
         message:err.message
        });
     }


}

exports.login = async (req, res) => { 
    const { email, password } = req.body;
    
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user || password!=user.password) { 
            return res.status(401).json({ 
                status: 'fail',
                message: 'Incorrect email or password'
             });
            
        }

        const token = jwt.sign({ id: user.id,username:user.username, email: user.email },
             process.env.JWT_SECRET,
              { expiresIn: process.env.JWT_EXPIRES_IN }
            );

        const cookieOptions = { expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), httpOnly: true }; 
        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({ 
            status: 'success',
            data: user 
        }); 
    } 
    catch(err) { 
        console.error(err);
        res.status(500).json({ 
            status: 'error',
             message:"Something went wrong"
            }); }

}    


exports.logout = (req, res) => {
    res.clearCookie('jwt', {
      httpOnly: true
    });
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
};


exports.protect=async(req,res,next)=>{

let token;
if(!req.cookies || !req.cookies.jwt){
    return next(new Error('You are not logged in'))
}
token=req.cookies.jwt;

 const decoded =await promisify(jwt.verify)(token,process.env.JWT_SECRET);
 console.log(decoded)
 req.user={username:decoded.username,email:decoded.email}
 
next()
}

exports.isLoggedIn=async(req,res,next)=>{

    let token;
    if(!req.cookies || !req.cookies.jwt){
       return res.status(500).json({ 
            status: 'error',
             message:"Something went wrong"
            });
    }
    token=req.cookies.jwt;
    
     const decoded =await promisify(jwt.verify)(token,process.env.JWT_SECRET);
      
     return res.status(200).json({
        status: 'success',
        data:decoded,
      });
    }




