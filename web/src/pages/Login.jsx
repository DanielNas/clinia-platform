import { useState } from "react";
import api from "../api/api";

export default function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("clinia_token", response.data.token);
        window.location.href = "/patients";
    }

    return (
        <form onSubmit={handleLogin}>
            <h1>Clinia</h1>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input type="passwword" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
            <button>Entrar</button>
        </form>
    )
}