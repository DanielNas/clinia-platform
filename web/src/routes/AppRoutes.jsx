import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Patients from "../pages/Patients";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("clinia_token");
    return token ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/patients"
                    element={
                        <PrivateRoute>
                            <Patients/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}