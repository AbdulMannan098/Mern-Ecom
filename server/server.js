const express=require('express')
const mongoose=require('mongoose')
const mogan=require('morgan')
const bodyParser=require('body-parser')
const cors=require('cors')
const {readdirSync}=require('fs')
require('dotenv').config()

//import routes
// const authRoutes=require('./routes/auth')

// app
const app=express()

//db
mongoose.connect(process.env.DATABASE,{
        // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopology:true,
})
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log("DB Connected Error",err))

// middlewares
app.use(mogan('dev'));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

//routes middleware
// app.use('/api',authRoutes)
readdirSync('./routes').map((r)=>app.use("/api", require('./routes/'+ r)))

// port
const port=process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`))
