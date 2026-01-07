import { useEffect, useState } from "react";
import api from "../api/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients").then(res => setPatients(res.data));
  }, []);

  return (
    <>
      <h1>Pacientes</h1>
      <ul>
        {patients.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}
