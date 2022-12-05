import jwt from 'jsonwebtoken';
import config from './config/config';

export const accessToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
        config.ACCESS_TOKEN_SECRET
    )
}


export const isAuth = (req, res, next) => {
    const bearerToken = req.headers.Authorization || req.headers.authorization;
    if(!bearerToken?.startsWith('Bearer ')) {
        res.status(401).send({message: 'Token is not supplied'})
    }
    else {
        const token = bearerToken.split(' ')[1];
        jwt.verify(
            token,
            config.ACCESS_TOKEN_SECRET, 
            (err, data) => {
                if(err) {
                    res.status(401).send({message: 'token invalid'});
                }
                else {
                    req.user = data;
                    next();
                }
            }
        );
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else {
        res.status(401).send({message: 'ban khong phai nguoi quan tri'})
    }
}