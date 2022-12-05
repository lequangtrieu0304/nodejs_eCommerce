import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { accessToken } from '../utils';

const createAdmin = async (req, res) => {
    try{  
        const hashPassword = await bcrypt.hash('anhtrieu', 10);
        const user = new User({
            name: 'quangTrieu',
            email: 'quangtrieu@01.com',
            password: hashPassword,
            isAdmin: true,
        });
        const createAdmin = await user.save();
        res.send(createAdmin)
    }
    catch(err){
        res.status(500).send({message: err.message})
    }
}   

const signIn = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(404).send({message: "email and passwprd are require!!"})
    }
    try{
        const signInUser = await User.findOne({
            email: email
        });
        if(!signInUser) {
            return res.status(404).send({message: 'user khong ton tai'})
        }
        const checkUser = await bcrypt.compare(password, signInUser.password);
        if(!checkUser){
            return res.status(404).send({message: 'password khong dung'})
        }
        else {
            res.status(200).send({
                _id: signInUser._id,
                name: signInUser.name,
                email: signInUser.email,
                isAdmin: signInUser.isAdmin,
                token: accessToken(signInUser),
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        return res.status(404).send({message: "name, email and password are require!!"})
    }
    try{
        const registerUser = await User.findOne({
            name: name
        });
        if(registerUser) {
            return res.status(404).send({message: 'user da ton tai'})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        })

        if(!newUser) {
            return res.status(400).send({message: 'dang ki that bai'})
        }
        else {
            res.status(201).send({
                message: 'Đăng kí thành công',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            })
        }
    }
    catch (err){
        console.log(err);
    }
}

const update = async (req, res) => {
    const {name, email, password} = req.body
    try{
        const updateUser = await User.findById(req.params.id);
        if(!updateUser) {
            return res.status(404).send({message: 'user khong ton tai'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        updateUser.name = name || updateUser.name;
        updateUser.email = email || updateUser.email;
        updateUser.password = hashPassword || updateUser.password;

        const user = await updateUser.save();
        res.status(200).send({
            message:'cap nhat thanh cong',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: accessToken(user)
        });   
    }
    catch (err){
        console.log(err);
    }
}

export default {
    createAdmin,
    signIn,
    register,
    update
}