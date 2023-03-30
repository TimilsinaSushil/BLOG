const express = require("express");
const userRouter = require("./routes/users");

const PORT = 4000;
const app = express();
app.use(express.json()); //Middleware to parse json body received in request.

app.get("/", (req, res) => {
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

// app.get('api//search',(req,res)=>{
//     const query =request.query
//     console.log(query.id)
// })

app.listen(PORT, () => console.log(`Express app runniing on ${PORT}`));
