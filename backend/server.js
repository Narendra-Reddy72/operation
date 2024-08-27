require('dotenv').config();

const app = require('./app')



const port = process.env.PORT || 3800

app.listen(port,()=>{
    try{
        console.log(`my server is runnig on ${port}`)
    }catch(err){
        console.log(`my server is not running on ${port}`)
    }
})

