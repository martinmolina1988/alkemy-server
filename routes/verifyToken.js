const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    try {
        const decoded = await jwt.verify(token,process.env.SECRET);
        
        req.id = decoded.id;
    } catch (error) {
        res.send({auth: false,error});
    }
   
    next();
}

module.exports = verifyToken;