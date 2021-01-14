const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

//middleware que verifica se o token ainda é válido, e se for, renova o seu tempo de expiração
module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token)
            return res.status(401).send("Token não fornecido");

        const decodedPayload = jwt.verify(token, authConfig.secretKey)

        delete decodedPayload.iat;
        delete decodedPayload.exp;
        delete decodedPayload.nbf;

        req.userId = decodedPayload.userId;
        req.token = token;

        const newToken = jwt.sign(decodedPayload, authConfig.secretKey, {
            expiresIn: 300, // 300 segundos = 5 minutos
        });

        res.cookie("token", newToken, { httpOnly: true });

        next();

    } catch (error) {
        return res.status(401).json(error);
    }
};
