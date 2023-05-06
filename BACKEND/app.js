const express = require("express");
const mongoose = require("mongoose");


//router
const userRouter = require("./routes/users");

//Middlewares
const logger = require("./middlewares/logger");

const PORT = 4000;
const app = express();

//Connecting database
mongoose.connect('mongodb://localhost:27017/quiz')
.then(()=>{
  app.listen(PORT, () => console.log(`Express app runniing on http://localhost:${PORT}`));
})
.catch((err)=>console.log('Err: ', err.message))

app.use(express.json()); //Middleware to parse json body received in request.
app.use(express.static("public")); //Middleware to make public folder to serve static content

//Custom middleware

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

//External custom middleware that runs only in development environment
if (app.get("env") == "development") {
  app.use(logger);
}

app.get("/api", (req, res) => {
  res.status(200).send({ status: "Server is running" });
});

app.use("/api/users", userRouter);

// app.get('/api/greet', (req,res)=>{
//     res.send({msg:'Hello Everyone'})
// })

// app.get('api/greet/:name',(req,res)=>{
//     const name = req.params.name;
//     res.send({msg:`Hello ${name}! Good Morning`})
// })

// app.post('api/courses',(req,res)=>{
//     const course =req.body;
//     res.send(course);
// })

// app.get('api/search',(req,res)=>{
//     const query =request.query
//     console.log(query.id)
// })

