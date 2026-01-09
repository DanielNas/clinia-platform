import { useEffect, useState } from "react";
import { getClinic } from "../api/clinic.service";

export default function Clinic() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClinic() {
      try {
        const data = await getClinic();
        setClinics(data); // espera ARRAY
      } catch (error) {
        console.error("Erro ao buscar clínicas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadClinic();
  }, []);

  if (loading) return <p>Carregando clínicas...</p>;

  if (!clinics.length) return <p>Nenhuma clínica encontrada</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Clínicas</h1>

      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id}>
            {clinic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
