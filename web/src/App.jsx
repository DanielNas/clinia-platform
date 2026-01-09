import { useState } from "react";
import Login from "./pages/Login";
import Clinic from "./pages/Clinic";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <button onClick={handleLogout}>Sair</button>
      <Clinic />
    </>
  );
}

export default App;
