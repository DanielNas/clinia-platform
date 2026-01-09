import prisma from "../../lib/prisma.js";

export async function createPatient(data) {
    if(!data.name){
        throw new Error("Nome do paciente é obrigatório");
    }

    return prisma.patient.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            clinicId: data.clinicId,
        },
    });
}

export async function listPatients(clinicId) {
    return prisma.patient.findMany({
        where: { clinicId },
    });
}