const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports = (req, res, next) =>{
    // const token = req.header("x-auth-token")
    // console.log(token)
    console.log("this is from is logged In", req.body)

    var authorizationToken = req.header("Authorization");
    console.log(authorizationToken);
    authorizationToken = authorizationToken.replace("Bearer ", "")
    console.log(authorizationToken);
    const token = authorizationToken;

    if(!token) {
        return res.json({
            "message": "you cant see this"
        }).status(401)

    }
    try{
        const decoded = jwt.verify(token, process.env.secret)
        req.user = decoded.user
        next();
    }
    catch(error){
        return res.json({"message": "your token is invalid"}).status(401)
    }
}

