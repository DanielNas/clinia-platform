import prisma from "../../lib/prisma.js"

export async function createPatient(req, res) {
    const { name, email, phone, birthDate } = req.boby;

    try {
        const patient = await prisma.patient.create({
            dta: {
                name,
                email,
                phone,
                birthDate: birthDate ? new Date(birthDate) : null,
                clinicId: req.user.clinicId,
            },
        });

        res.status(201).json(patient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function listPatients(req, res) {
    const patients = await prisma.patient.findMany({
        where: { clinicId: req.user.clinicId},
        orderBy: { createdAt: "desc"},
    });

    res.json(patients)
}