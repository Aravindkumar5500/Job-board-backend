const express = require("express")
const mongoose =  require("mongoose")
const cors = require("cors")
const dotenv =require('dotenv')
const {Job} = require("./model/job")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())




// MongoDB Connection

async function connection(){
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB Connect",connect.connection.host)
    } catch (error) {
        console.error(error.message,"MongoDB Not Connect")
        
    }
}
connection()

// GET /jobs – return all jobs
app.get("/jobs",async(req,res,next)=>{
    try {
        const data = await Job.find()
        res.send({message:"Return All Job",status:200,data:data})
    } catch (error) {
        console.log("error")
    }
})

// GET /jobs/:id – return a specific job

app.get("/jobs/:id",async(req,res,next)=>{
    const { id } = req.params;
     if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID", status: 400 });
  }

    try {
        const data = await Job.findById(req.params.id);
        if(!data){
            res.send({message:"Not Found",status:404})
            return;
        }
        res.send({message:"Data Found",status:200,data:data})
    } catch (error) {
        console.log(error)
        next(error)
    }
})


// POST /jobs – create a new job

app.post("/jobs",async(req,res,next)=>{
    try {
        const {title,company,description} = req.body;
         // Validation Check
        if (!title||!company||!description){
            res.send({status:400,message:"All fields Required"});
            return;
        }

        // Duplicate Check 
        const isExist = await Job.findOne({ title, company });
        if (isExist) {
        res.send({message: "Job already exists",status:409 })
        return;
}
       //  Save new job
        const newJob = new Job({ title, company, description });
        const data = await newJob.save();
        res.send({message:"New Job Add",status:200,data:data});
    } catch (error) {
        console.log(error);
       next(error) ;
       
    }
});





// Corrected Error Handler
app.use((err,req,res,next)=>{
    res.send({status:500,error:err?.message || "Server Error"})
})
//  Start Server
 app.listen(3007,()=>console.log(`Server in Running`))
//app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})