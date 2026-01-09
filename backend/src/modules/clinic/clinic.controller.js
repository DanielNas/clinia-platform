import * as clinicService from "./clinic.service.js";

// Retorna a clínica do usuário logado
export async function getClinic(req, res) {
    try {
        const clinic = await clinicService.getClinicById(req.user.clinicId);
        return res.json(clinic);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

// Atualiza os dados da clínica
export async function updateClinic(req, res) {
    try {
        const clinic = await clinicService.updateClinic(
            req.user.clinicId,
            req.body
        );
        return res.json(clinic);
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}