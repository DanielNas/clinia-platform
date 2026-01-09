import prisma from "../../lib/prisma.js";

// Busca pelo ID 
export async function getClinicById(clinicId) {
    const clinic = await prisma.clinic.findUnique({
        where: { id: clinicId},
    });

    if (!clinic) {
        throw new Error("Clínica não encontrada");
    }

    return clinic;
}

//Atualiza os dados da clinica
export async function updateClinic(clinicId, data) {
    return prisma.clinic.update({
        where: { id: clinicId },
        data: {
            name: data.name,
        },
    });
}
