module.exports = (req,res,next ) =>{
    console.log("You are using development environment")
    next()
}