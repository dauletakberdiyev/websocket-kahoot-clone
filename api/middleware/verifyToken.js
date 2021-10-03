const jwt = require('jsonwebtoken');

function verify(req, res, next){
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    if(token){
        try{
            const user = jwt.verify(token, process.env.SECRET_KEY);
            req.user = user;
        }catch(err){
            return res.status(403).json('Token is not valid!');
        }
        return next();
    }else{
        return res.status(401).json('You are not authenticated');
    }
}

module.exports = verify; 