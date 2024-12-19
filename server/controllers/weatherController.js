const pool=require('../db')
exports.getWeather=async(req,res)=>{
    const {city}=req.params;
    console.log(city)
    try{
    const response=await fetch(`http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${city}`);
    const weather=await response.json()
    const results= await pool.query('insert into history (username,city) values ($1 ,$2) returning *',[req.user.username,city])

    res.status(200).json({
        status:'success',
        data:weather
    })

    }
    catch(err){
        console.error(err);
        res.status(500).json({ 
            status: 'error',
             message:"Something went wrong"
            });
    }
}

exports.weatherHistory=async(req,res)=>{
    try{
    const data=await pool.query('select * from history');
    
    res.status(200).json({ 
        status: 'success',
         data:data.rows
        });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ 
            status: 'error',
             message:"Something went wrong"
            });
    }

}