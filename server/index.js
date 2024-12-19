const express=require('express')
const app=express();
const cors = require('cors');
const authController=require('./controllers/authControllers')
const weatherController=require('./controllers/weatherController');
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],      
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,             
}));
app.use(express.json());
app.use(cookieParser());



app.route('/signup').post(authController.signup)
app.route('/login').post(authController.login)
app.route('/logout').post(authController.logout)
app.route('/isLoggedIn').get(authController.isLoggedIn)
app.route('/get-weather/:city').get(authController.protect,weatherController.getWeather)
app.route('/weather-history').get(authController.protect,weatherController.weatherHistory)


app.listen(3000,()=>{
    console.log("Server running")
})
