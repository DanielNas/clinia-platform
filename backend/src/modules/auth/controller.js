import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    const { clinicName, name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.clinic.create({
            data: {
                name: clinicName,
                users: {
                    create: {
                        name,
                        email,
                        password: hashedPassword,
                        role: "ADMIN",
                    },
                },
            },
        });

        return res.status(201).json({
            message: "Clínica criada com sucesso",
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign(
        {
            userId: user.id,
            clinicId: user.clinicId,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return res.json({ token });
}
