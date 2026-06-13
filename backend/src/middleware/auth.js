const jwt=require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer')) {
        return res.status(401).json({error: "токена нет"});
    }
    try {
        const token = header.split(' ')[1];
        const decoded=jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'неверный токен' });
    }
};

module.exports={auth, JWT_SECRET};
