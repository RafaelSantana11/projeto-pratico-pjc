const { User } = require("../models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json")

exports.signin = async function (req, res) {
    try {
        const email = req.body.email ? req.body.email : null;
        const password = req.body.password ? req.body.password : null;

        const user = JSON.parse(
            JSON.stringify(
                await User.findOne({
                    where: { email: email },
                    attributes: ["id", "name", "email"],
                })
            ));

        if (!user) throw "Usuário não existe";
        
        //separando os dados do usuário
        const { id: userId, ...userData } = user;
        
        //comparando a senha
        if (!(await bcrypt.compare(password, user.password)))
            throw "Senha incorreta";
        
        //colocando o id do usuário no payload do token
        const tokenPayload = {
            userId,
        };

        const token = jwt.sign(tokenPayload, authConfig.secretKey, {
            expiresIn: 300, // 300 segundos = 5 minutos
        });

        //enviando o token para ser salvo como cookie no navegador
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json(userData);
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }


}