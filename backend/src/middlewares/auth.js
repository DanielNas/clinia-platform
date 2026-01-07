import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authoriztionn;

    if(!authHeader) {
        return res.status(401).json({ error: "Token não informado" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.userId,
            clinicId: decoded.clinicId,
            role: decoded.role
        };

    next();   
    } catch {
        return res.status(401).json({ error: "Token inválido"});
    }
}
